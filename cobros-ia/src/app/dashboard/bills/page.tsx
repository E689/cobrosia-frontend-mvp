'use client'

import BillsForm from "@/components/bills/BillsForm";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Messages() {
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

    // Procedures
    session.then((res) => {
        if (res) setUserId(res.user.id)
    })

    useEffect(() => {
        if (billAdded) setBillAdded(false)
        if (userId) loadBills()
    }, [userId, billAdded])

    return (
        <div className="h-fit flex flex-col gap-4 py-20 px-20">
            <div className="flex flex-row w-full">
            <div className="flex grow h-[10vh] p-4">
                    <input
                        id="searchBar"
                        value={searchBill}
                        autoComplete="on"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Nombre de cliente"
                        onChange={(e) => { setSearchBill((e.target as HTMLInputElement).value) }}
                    />
                </div>
            </div>

            <BillsForm 
                userId={userId}
                setBillAdded={setBillAdded}
            />

            <div className="flex flex-row w-full">
                <div className="bg-darkbg rounded-md grow p-4 flex flex-col gap-2">
                    {
                        bills ? (
                            bills.map((bill) => {
                                return (
                                    <div className="flex flex-row w-full h-10 gap-2 text-brand-color" key={bill._id}>
                                        <span>Monto: {bill.amount}</span>
                                        <span>Fecha Cobro: {bill.dueDate}</span>
                                        <span>Estado: {bill.status}</span>
                                        <span>Cliente: {bill.client}</span>
                                    </div>
                                )
                            })
                        ) : (
                            <span>No hay clientes</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}