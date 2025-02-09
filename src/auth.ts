import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig, Session, User } from "next-auth";
import type { UserType, userResponseType } from "./types/user";
import { AdapterUser } from "next-auth/adapters";
import { CredentialsType, SocialCredentialsType } from "./types/login";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserType { }
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
    Providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            authorize: async (credentials) => {
                try {
                    const user = await fetchUser(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
                        {
                            username: typeof credentials.username === 'string' ? credentials.username : '',
                            password: typeof credentials.password === 'string' ? credentials.password : ''
                        }
                    );
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
    session: {}
}