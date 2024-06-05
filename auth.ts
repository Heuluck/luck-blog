import NextAuth from "next-auth";
import "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import dbQuery from "./utils/connection";

const config = {
    theme: { logo: "https://authjs.dev/img/logo-sm.png" },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "用户名", type: "text" },
                password: { label: "密码", type: "password" },
            },
            async authorize(credentials) {
                
                if (credentials?.username == "123" && credentials?.password == "456") {
                    return {
                        id: "1",
                        name: "admin",
                        email: "admin@example.com",
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ request, auth }) {
            return true;
        },
        async jwt({ token, user }) {
            return token;
        }
    },
    experimental: {
        enableWebAuthn: true,
    },
    debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
