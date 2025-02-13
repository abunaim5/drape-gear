import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig, Session, User } from "next-auth";
import type { UserType, UserResponseType } from "./types/user";
import { AdapterUser } from "next-auth/adapters";
import { CredentialsType, SocialCredentialsType } from "./types/login";
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
                    const user = await fetchUser(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
                        email: typeof credentials.email === 'string' ? credentials.email : '',
                        password: typeof credentials.password === 'string' ? credentials.password : ''
                    });
                    return user ? createUser(user) : null;
                } catch (error) {
                    console.error('Error during authentication', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {},
    pages: {},
    session: {
        strategy: 'jwt'
    }
} satisfies NextAuthConfig;

const fetchUser = async (url: string, body: CredentialsType) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const user = await res.json();
        if (res.ok && user) {
            return user;
        } else {
            console.error(`Failed to fetch user: ${res.status} ${res.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error during fetch: ${error}`);
    }
};

const createUser = (user: UserResponseType) => {
    const userObject: UserType = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
        subId: ''
    }
    return userObject;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);