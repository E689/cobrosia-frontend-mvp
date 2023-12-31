'use client'

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

export default function BillsLogView({ billId, expanded, setExpanded, setSideBarExpanded }) {
    // Vars
    const [log, setLog] = useState(null)

    // Functions
    const loadLog = useCallback(() => {
        fetch(
            process.env.NEXT_PUBLIC_API_URL + `/bills/log/${billId}`,
            {
                cache: "no-cache"
            }
        ).then((res) => res.json())
            .then((data) => {
                setLog(data.log)
            })
    }, [billId])

    useEffect(() => {
        if (billId) loadLog()
    }, [billId, loadLog])

    return (
        <div className={`h-screen fixed right-0 ${expanded ? "w-[20vw]" : "w-[0vw]"} transition-all duration-150 ease-in-out`}>
            <div className={`h-full flex flex-col bg-classy-blue border-r shadow-md rounded-l-md relative ${expanded ? "p-5" : "p-0"}`}>
                <button
                    onClick={() => { setExpanded((curr) => !curr); setSideBarExpanded((curr) => expanded ? curr : false) }}
                    className={`flex w-10 h-10 bg-classy-blue text-lightbg rounded-full absolute ${expanded ? "-left-5" : "-left-7"} top-5 shadow-md hover:cursor-pointer hover:bg-classy-light-blue`}
                >
                    {expanded ? <FaAngleDoubleRight className="m-auto" /> : <FaAngleDoubleLeft className="m-auto" />}
                </button>
                <div className={`h-full flex flex-col bg-lightbg rounded-md p-2 overflow-y-auto gap-2 ${expanded ? "w-full" : "w-0 invisible"}`}>
                    {
                        log ? (
                            log.map((entry) => {
                                if (entry.user === "GPT") {
                                    return (
                                        <div className="flex flex-row" key={entry._id}>
                                            <div className="flex">
                                                <Image
                                                    src={`https://ui-avatars.com/api/?background=00DAC6&color=000&bold=true&name=${entry.user}`}
                                                    width={500}
                                                    height={500}
                                                    alt="User profile picture"
                                                    className="w-10 h-10 rounded-md"
                                                />
                                            </div>
                                            <div className="flex max-w-[90%] h-full border border-brand-color rounded-md p-1">
                                                <span className="mr-auto pl-1 text-sm">{entry.msg}</span>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="flex flex-row-reverse" key={entry._id}>
                                            <div className="flex">
                                                <Image
                                                    src={`https://ui-avatars.com/api/?background=4290E2&color=000&bold=true&name=${entry.user}`}
                                                    width={500}
                                                    height={500}
                                                    alt="User profile picture"
                                                    className="w-10 h-10 rounded-md"
                                                />
                                            </div>
                                            <div className="flex max-w-[90%] h-full border border-classy-blue rounded-md p-1">
                                                <span className="ml-auto pr-1 text-sm">{entry.msg}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <span className="font-bold m-auto">No hay mensajes en el chat.</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}