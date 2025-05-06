import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig, Session, User } from "next-auth";
import type { UserType, UserResponseType } from "./types/user";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import axios from "axios";

declare module "next-auth" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserType { }
    interface Session {
        user: User;
    }
}

declare module "next-auth/adapters" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface AdapterUser extends UserType { }
}

declare module "next-auth/jwt" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface JWT extends UserType { }
}

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                try {
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
                    const res = await axios.post(`${baseUrl}/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const user = res?.data;
                    if (!user) {
                        console.error("No user returned from backend");
                        return null;
                    }

                    return createUser(user);
                } catch (error) {
                    console.error('Error during authentication', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }: { token: JWT; user: User }) => {
            // add user properties to the token after signing in
            if (user) {
                token.id = user.id as string;
                token.name = user.name;
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.subId = user.subId;
                token.role = user.role;
                token.createdAt = user.createdAt;
            }
            return token;
        },
        session: async ({ session, token }: { session: Session; token: JWT }) => {
            // create a user object with token properties
            const userObject: AdapterUser = {
                id: token.id,
                name: token.name,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                subId: token.subId,
                email: token.email ? token.email : '',
                emailVerified: null,
                role: token.role,
                createdAt: token.createdAt
            }
            // add user object to the session
            session.user = userObject;
            return session;
        }
    },
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    trustHost: true
} satisfies NextAuthConfig;

// create user object
const createUser = (user: UserResponseType) => {
    const userObject: UserType = {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
        subId: '',
        role: user.role,
        createdAt: user.createdAt
    }
    return userObject;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);