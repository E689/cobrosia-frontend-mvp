'use client'

import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

export default function BillsForm({ clients, setBillModified }) {
    // Vars
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
            "clientId": billClientID,
            "billId": billId,
            "context": {
                "reminder": "5",
                "editDueDate": "false",
                "priority": "1",
                "other": "Tratar al cliente con respeto."
            },
        }
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + '/bills',
            {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        ).then((res) => {
            if (res.ok) {
                reloadBillsList()
                toast.success("Se creo la factura correctamente!")
            } else {
                toast.error("Algo salio mal, no se pudo crear la factura.")
            }
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
        setBillModified(true)
    }

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
            <div className="bg-classy-blue hover:bg-classy-light-blue rounded-md h-[5vh] p-1 flex">
                <button
                    className="w-[10vw] text-lightbg disabled:text-slate-400 disabled:cursor-not-allowed"
                    onClick={() => addBill()}
                    disabled={missingField ? true : false}
                >
                    <IoIosAdd className="w-10 h-10 inline" /> Agregar
                </button>
            </div>
            <div className="bg-classy-blue rounded-md h-full grow p-1 m-auto flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        No. Factura
                        <input
                            name={`billId`}
                            value={billId}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="0001"
                            onChange={(e) => { setBillId((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Nombre del cliente
                        <select
                            name={`billClientID`}
                            value={billClientID}
                            onChange={(e) => { setBillClientID((e.target as HTMLSelectElement).value) }}
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                        >
                            <option value="">Sin Cliente</option>
                            {
                                clients ? (
                                    clients.map((cliente, index) => {
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
                    <label className="text-lightbg font-bold">
                        Fecha de Cobro
                        <input
                            name={`billDueDate`}
                            value={billDueDate}
                            autoComplete="off"
                            type="date"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            onChange={(e) => { setBillDueDate((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Estado
                        <select
                            name={`billStatus`}
                            value={billStatus}
                            onChange={(e) => { setBillStatus((e.target as HTMLSelectElement).value) }}
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                        >
                            <option value="">Sin estado</option>
                            <option value="pending">Pendiente</option>
                            <option value="inProgress">En cobranza</option>
                            <option value="collected">Cobrada</option>
                        </select>
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Monto (Q)
                        <input
                            name={`billAmount`}
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