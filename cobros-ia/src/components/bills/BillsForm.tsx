'use client'

import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function BillsForm({ userId, setBillAdded }) {
    // Vars
    const [clients, setClients] = useState(null)

    // Add Bill variables
    const [billAmount, setBillAmount] = useState("")
    const [billDueDate, setBillDueDate] = useState("")
    const [billStatus, setBillStatus] = useState("")
    const [billClientID, setBillClientID] = useState("")
    const [billId, setBillId] = useState("")

    // Error variables
    const [missingField, setMissingField] = useState(true)

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

    const reloadBillsList = () => {
        // Clean added values
        setBillAmount("")
        setBillDueDate("")
        setBillStatus("")
        setBillClientID("")
        setBillId("")

        // Refresh bills list
        setBillAdded(true)
    }

    useEffect(() => {
        if (userId) loadClients()
    }, [userId])

    useEffect(() => {
        if (billAmount !== "" && billDueDate !== "" && billStatus !== "" &&
            billClientID !== "" && billId !== "") {
            setMissingField(false)
        } else {
            setMissingField(true)
        }
    }, [billAmount, billDueDate, billStatus, billClientID, billId])

    return (
        <div className="flex flex-row-reverse w-full gap-4">
            <div className="bg-darkbg rounded-md h-[5vh] p-1 flex">
                <button
                    className="w-[10vw] text-brand-color disabled:text-slate-50"
                    onClick={addBill}
                    disabled={missingField ? true : false}
                >
                    <IoIosAdd className="w-10 h-10 inline" /> Agregar
                </button>
            </div>
            <div className="bg-darkbg rounded-md h-full grow p-1 m-auto flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-brand-color font-bold">
                        No. Factura
                        <input
                            value={billId}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="0001"
                            onChange={(e) => { setBillId((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-brand-color font-bold">
                        Nombre del cliente
                        <select
                            value={billClientID} 
                            onChange={(e) => { setBillClientID((e.target as HTMLSelectElement).value) }}
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                        >
                            {
                                clients ? (
                                    clients.map((cliente) => {
                                        return (
                                            <option value={cliente._id} key={cliente._id}>{cliente.clientName}</option>
                                        )
                                    })
                                ) : (
                                    <option value="na">Sin Cliente</option>
                                )
                            }
                        </select>
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-brand-color font-bold">
                        Fecha de Cobro
                        <input
                            value={billDueDate}
                            autoComplete="off"
                            type="date"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            onChange={(e) => { setBillDueDate((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-brand-color font-bold">
                        Estado
                        <select 
                            value={billStatus}
                            onChange={(e) => { setBillStatus((e.target as HTMLSelectElement).value) }}
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                        >
                            <option value="pending">Pendiente</option>
                            <option value="inProgress">En cobranza</option>
                            <option value="collected">Cobrada</option>
                        </select>
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-brand-color font-bold">
                        Monto (Q)
                        <input
                            value={billAmount}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="100.00"
                            type="number"
                            min={0}
                            max={99999999}
                            step={0.01}
                            onChange={(e) => { setBillAmount((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}