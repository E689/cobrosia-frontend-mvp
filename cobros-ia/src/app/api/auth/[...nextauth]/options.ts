import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Nombre de usuario", type: "text", placeholder: "admin" },
                password: { label: "Contraseña", type: "password", placeholder: "********" },
            },
            async authorize(credentials, req) {
                /** 
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
            
                // If no error and we have user data, return it
                if (res.ok && user) {
                return user
                }
                */
                // Bypass for auth for dev:
                const user = {
                    id: "1",
                    name: "Zac Efron",
                    password: "uim4life"   
                }
                return user
                
                // Return null if user data could not be retrieved
                //return null
            }
        })
    ],
    pages: {
        signIn: '/login'
    }
}