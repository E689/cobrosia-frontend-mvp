'use client'

import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function Messages() {
    const [bills, setBills] = useState(null)
    const [clients, setClients] = useState(null)
    const searchBill = useRef("")

    // Add Bill variables
    const [billAmount, setBillAmount] = useState("")
    const [billDueDate, setBillDueDate] = useState("")
    const [billStatus, setBillStatus] = useState("")
    const [billClientID, setBillClientID] = useState("")

    // Session
    const session = getSession()
    const [userId, setUserId] = useState(null)

    // Functions
    const addBill = async () => {
        const data = {
            "amount": billAmount,
            "dueDate": billDueDate,
            "status": billStatus,
            "clientId": billClientID
        }
        const response = await fetch(
            'http://18.225.35.234/api/bills',
            {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        ).then((res) => {
            if (res.ok) reloadBillsList()
        })
    }

    const reloadBillsList = () => {
        // Clean added values
        setBillAmount("")
        setBillDueDate("")
        setBillStatus("")
        setBillClientID("")

        // Refresh bills list
        loadBills()
    }

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
        if (userId) {
            loadBills()
            loadClients()
        }
    }, [userId])

    return (
        <div className="h-fit flex flex-col gap-4 py-20 px-20">
            <div className="flex flex-row w-full">
                <div className="flex grow h-[10vh] p-4">
                    <input
                        id="searchBar"
                        autoComplete="on"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Numero de factura"
                        onChange={(e) => { searchBill.current = (e.target as HTMLInputElement).value }}
                    />
                </div>
            </div>

            <div className="flex flex-row-reverse w-full gap-4">
                <div className="bg-darkbg rounded-md h-[5vh] p-1 flex">
                    <button
                        className="w-[10vw] text-brand-color"
                        onClick={addBill}
                    >
                        <IoIosAdd className="w-10 h-10 inline" /> Agregar
                    </button>
                </div>
                <div className="bg-darkbg rounded-md h-[5vh] grow p-1 m-auto flex">
                    <input
                        id="billAmount"
                        value={billAmount}
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Monto de la Factura"
                        onChange={(e) => { setBillAmount((e.target as HTMLInputElement).value) }}
                    />
                    <input
                        id="billDueDate"
                        value={billDueDate}
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Fecha de pago"
                        onChange={(e) => { setBillDueDate((e.target as HTMLInputElement).value) }}
                    />
                    <input
                        id="billStatus"
                        value={billStatus}
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Estado de la factura"
                        onChange={(e) => { setBillStatus((e.target as HTMLInputElement).value) }}
                    />
                    <input
                        id="billClientID"
                        value={billClientID}
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Id del cliente"
                        onChange={(e) => { setBillClientID((e.target as HTMLInputElement).value) }}
                    />
                </div>
            </div>

            <div className="flex flex-row w-full">
                <div className="bg-darkbg rounded-md grow p-4 flex flex-col gap-2">
                    {
                        bills ? (
                            bills.map((bill) => {
                                return (
                                    <div className="flex flex-row w-full h-10 gap-2 text-brand-color">
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