'use client'

import BillsCard from "@/components/bills/BillsCard";
import BillsForm from "@/components/bills/BillsForm";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import BillsLogView from "@/components/bills/BillsLogView";

export default function Messages() {
    // Vars
    const [clients, setClients] = useState(null)

    // Chat log expanded variables
    const [logExpanded, setLogExpanded] = useState(false)
    const [logBill, setLogBill] = useState("")

    const [bills, setBills] = useState(null)
    const [billModified, setBillModified] = useState(false)
    const [searchBill, setSearchBill] = useState("")

    const [userId, setUserId] = useState(null)

    // Session
    const { data: session } = useSession()

    useEffect(() => {
        if (session) setUserId(session.user.id)
    }, [session])

    const loadBills = useCallback(() => {
        fetch(
            process.env.NEXT_PUBLIC_API_URL + `/bills/${userId}`,
            {
                cache: "no-cache"
            }
        ).then((res) => res.json())
            .then((data) => {
                setBills(data.bills)
            })
    }, [userId])

    const loadClients = useCallback(() => {
        fetch(
            process.env.NEXT_PUBLIC_API_URL + `/clients/${userId}`,
            {
                cache: "no-cache"
            }
        ).then((res) => res.json())
            .then((data) => {
                setClients(data.clients)
            })
    }, [userId])

    useEffect(() => {
        if (billModified) setBillModified(false)
        if (userId) { loadBills(); loadClients() }
    }, [userId, billModified, loadBills, loadClients])

    useEffect(() => {
        if (logBill) setLogExpanded(true)
    }, [logBill])

    if (session) {
        return (
        <div className="flex overflow-y-hidden">
            <div className="h-fit flex flex-col gap-4 py-20 px-20">
                <div className="flex flex-row w-full">
                    <div className="flex grow h-[10vh] p-4">
                        <input
                            id="searchBar"
                            value={searchBill}
                            autoComplete="on"
                            className="w-full rounded-md py-1 px-5 text-darkbg font-bold"
                            placeholder="Nombre de cliente"
                            onChange={(e) => { setSearchBill((e.target as HTMLInputElement).value) }}
                        />
                    </div>
                </div>

                <BillsForm
                    clients={clients ? clients : ""}
                    setBillModified={setBillModified}
                />

                <div className="flex flex-col w-full gap-2">
                    {
                        bills ? (
                            bills.map((bill) => {
                                return (
                                    <BillsCard
                                        originalData={{
                                            "billAmount": bill.amount,
                                            "billDueDate": bill.dueDate,
                                            "billStatus": bill.status,
                                            "billClientID": bill.client._id,
                                            "billClientName": bill.client.clientName,
                                            "billId": bill.billId,
                                            "billContext": bill.context,
                                            "id": bill._id
                                        }}
                                        setBillModified={setBillModified}
                                        clients={clients}
                                        setLogBill={setLogBill}
                                        setLogExpanded={setLogExpanded}
                                        key={bill._id}
                                    />
                                )
                            })
                        ) : (
                            <span>No hay clientes</span>
                        )
                    }
                </div>
            </div>
            <BillsLogView 
                billId={logBill}
                expanded={logExpanded}
                setExpanded={setLogExpanded}
            />
        </div>
    )
    } else {
        return (
            <div className="w-100 h-screen flex">
                <span className="text-black font-bold m-auto">Cargando...</span>
            </div>
        )
    }
}