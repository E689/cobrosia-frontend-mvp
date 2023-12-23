'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function userAuthLayout({ children }) {
    const { data: session } = useSession();

    return (
        <>
            {
                session ?
                    (
                        redirect("/dashboard")
                    ) : (
                        <div className="mx-auto px-6 bg-lightbg w-full h-screen">
                            <div className="grid grid-cols-3 grid-rows-3 h-full">
                                <div className="col-auto relative">
                                    <div className="absolute text-darkbg font-bold ml-10 mt-10">
                                        <Link href='/home'>
                                            <FaArrowLeft className="inline" /> Regresar
                                        </Link>
                                    </div>
                                </div>
                                <div className="row-start-2 col-start-2">
                                    {children}
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}