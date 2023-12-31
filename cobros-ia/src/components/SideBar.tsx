'use client'

import React, { useContext, createContext, useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const SidebarContext = createContext(null)

export default function SideBar({ children, expanded, setExpanded }) {
    const [user, setUser] = useState("")

    // Session
    const { data: session } = useSession()

    useEffect(() => {
        if (session) setUser(session.user.name)
    }, [session])

    return (
        <div className={`h-screen float-left ${expanded ? "w-[20vw]" : "w-[5vw]"} transition-all duration-150 ease-in-out`}>
            <nav className="h-full flex flex-col bg-classy-blue border-r shadow-md rounded-r-md">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Image
                        src="/logo-removebg.png"
                        width="500"
                        height="500"
                        alt="logo png"
                        priority
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-lightbg hover:bg-gray-100 w-[5vw] text-darkbg">
                        {expanded ? <RiMenuUnfoldLine className="w-[5vw] m-auto" /> : <RiMenuFoldLine className="m-auto" />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <Image
                        src={`https://ui-avatars.com/api/?background=00DAC6&color=A12697&bold=true&name=${user}`}
                        width={500}
                        height={500}
                        alt="User profile picture"
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all w-full ${expanded ? "w-52 ml-3" : "invisible"}`}
                    >
                        <div className="leading-4">
                            <h4 className={`font-semibold text-lightbg`}>{user}</h4>
                        </div>

                        <CiLogout
                            className="w-10 h-10 text-lightbg hover:cursor-pointer"
                            onClick={() => signOut()}
                        />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export function SidebarItem({ icon, text, path, active, alert }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <Link href={path}>
            <li
                className={`
          relative flex items-center py-2 px-3 my-1
          font-bold rounded-md cursor-pointer
          transition-colors group
          ${active
                        ? "bg-lightbg text-darkbg"
                        : "hover:bg-lightbg text-lightbg hover:text-darkbg"
                    }`}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                        }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-switch-purple ${expanded ? "" : "top-2"
                            }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-darkbg text-lightbg text-sm
            invisible opacity-20 -translate-x-1 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}
