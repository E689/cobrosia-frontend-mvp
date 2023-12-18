import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation"


export default async function LogIn() {
    const session = await getServerSession(options)
    
    return (
        <>
            { 
                session ? redirect("/dashboard") 
                : (
                    <div>This should be a login...</div>
                )
            }
        </>
    )
}