import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Nombre de usuario", type: "text", placeholder: "admin" },
                password: { label: "Contraseña", type: "password", placeholder: "********" },
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                /**
                // Bypass for auth for dev:
                const user = {
                    id: "658de49309be41f5d6b6c30a",
                    name: "perry@perry.com",   
                }
                return user
                */
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),
    },
    pages: {
        signIn: '/login'
    }
}