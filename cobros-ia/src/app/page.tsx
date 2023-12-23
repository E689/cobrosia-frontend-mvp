import { redirect } from "next/navigation"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default async function Home() {
    redirect('/home')
}