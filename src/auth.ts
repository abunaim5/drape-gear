import "next-auth"
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig, Session, User } from "next-auth";
import type { UserType, userResponseType } from "./types/user";
import { AdapterUser } from "next-auth/adapters";
import { CredentialsType, SocialCredentialsType } from "./types/login";
import { JWT } from "next-auth/jwt";
import axios from "axios";



declare module "next-auth" {
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
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    });
                    if (!res.ok) throw new Error('Invalid credentials');
                    const user = await res.json();
                    return user;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };