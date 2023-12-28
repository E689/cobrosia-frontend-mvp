'use client';

import { signIn } from "next-auth/react";
import Image from 'next/image';
import React, { useRef } from "react";

export default function LogIn() {
    const userName = useRef("")
    const pass = useRef("")

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            username: userName,
            password: pass,
            redirect: false,
            callbackUrl: "/dashboard"
        })
    }

    return (
        <>
            <div className="grid grid-rows-6 gap-2 h-full m-auto bg-darkbg p-4 rounded-lg shadow-xl">
                <div className="row-start-1 row-span-2">
                    <Image
                        src="/logo-removebg.png"
                        width="500"
                        height="500"
                        alt="logo png"
                        className="m-auto max-h-full px-8 py-3"
                        loading="lazy"
                    />
                </div>
                <div className="row-start-3 row-span-1">
                    <div className="flex h-full">
                        <input
                            id="username"
                            autoComplete="on"
                            className="px-5 py-1 m-auto h-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-color"
                            placeholder="Nombre de usuario"
                            type="text"
                            onChange={(e) => {
                                userName.current = (e.target as HTMLInputElement).value
                            }}
                        />
                    </div>
                </div>
                <div className="row-start-4 row-span-1">
                    <div className="flex h-full">
                        <input
                            id="password"
                            autoComplete="off"
                            className="px-5 py-1 m-auto h-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-color"
                            placeholder="Contraseña"
                            type="password"
                            onChange={(e) => {
                                pass.current = (e.target as HTMLInputElement).value
                            }}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") { onSubmit() }
                            }}
                        />
                    </div>
                </div>
                <div className="row-start-5 row-span-2">
                    <div className="flex h-full">
                        <button
                            className="px-5 py-1 m-auto h-1/2 text-gray-50 bg-brand-color rounded-md border-0 hover:text-switch-purple hover:shadow-inner"
                            onClick={onSubmit}
                        >
                            Log-in
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}