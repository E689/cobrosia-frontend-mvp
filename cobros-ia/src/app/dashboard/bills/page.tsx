'use client'

import BillsCard from "@/components/bills/BillsCard";
import BillsForm from "@/components/bills/BillsForm";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Messages() {
    // Vars
    const [clients, setClients] = useState(null)

    const [bills, setBills] = useState(null)
    const [billAdded, setBillAdded] = useState(false)
    const [searchBill, setSearchBill] = useState("")

    // Session
    const session = getSession()
    const [userId, setUserId] = useState(null)

    const loadBills = async () => {
        const response = await fetch(
            `http://18.225.35.234/api/bills/${userId}`,
            {
                cache: "no-cache"
            }
        ).then((res) => res.json())
            .then((data) => {
                setBills(data.bills)
            })
    }

    const loadClients = async () => {
        const response = await fetch(
            `http://18.225.35.234/api/clients/${userId}`,
            {
                cache: "no-cache"
            }
        ).then((res) => res.json())
            .then((data) => {
                setClients(data.clients)
            })
    }

    // Procedures
    session.then((res) => {
        if (res) setUserId(res.user.id)
    })

    useEffect(() => {
        if (billAdded) setBillAdded(false)
        if (userId) { loadBills(); loadClients() }
    }, [userId, billAdded])

    return (
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
                setBillAdded={setBillAdded}
            />

            <div className="flex flex-col w-full gap-2">
                {
                    bills ? (
                        bills.map((bill) => {
                            return (
                                <BillsCard 
                                    originalData={{
                                        "billAmount":bill.amount,
                                        "billDueDate":bill.dueDate,
                                        "billStatus":bill.status,
                                        "billClientID":bill.client,
                                        "billClientName":"Test Data",
                                        "billId": "0001",
                                        "billContext": {
                                            "reminder": "5",
                                            "editDueDate": false,
                                            "priority": "1",
                                            "other": "Tratar al cliente con respeto."
                                        }
                                    }}
                                    clients={clients}
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
    )
}