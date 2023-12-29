'use client'

import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function ClientForm({ userId, setClientAdded }) {
    // Add Client variables
    const [clientName, setClientName] = useState("")
    const [clientContactName, setClientContactName] = useState("")
    const [clientContactLastName, setClientContactLastName] = useState("")
    const [clientContactPhone, setClientContactPhone] = useState("")
    const [clientContactEmail, setClientContactEmail] = useState("")

    // Error variables
    const [missingField, setMissingField] = useState(true)

    // Functions
    const addClient = async () => {
        const data = {
            "clientName": clientName,
            "contactName": clientContactName,
            "contactlastName": clientContactLastName,
            "phone": clientContactPhone ? clientContactPhone : "00000000",
            "email": clientContactEmail ? clientContactEmail : " - ",
            "userId": userId
        }
        const response = await fetch(
            'http://18.225.35.234/api/clients',
            {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        ).then((res) => {
            // Add a creation success alert.
            if (res.ok) reloadClientsList()
        })
    }

    const reloadClientsList = () => {
        // Clean added values
        setClientName("")
        setClientContactName("")
        setClientContactLastName("")
        setClientContactPhone("")
        setClientContactEmail("")

        setClientAdded(true)
    }

    useEffect(() => {
        if (clientName !== "" && clientContactName !== "" && clientContactLastName !== "" &&
            (clientContactEmail !== "" || clientContactPhone !== "")) {
            setMissingField(false)
        } else {
            setMissingField(true)
        }
    }, [clientName, clientContactName, clientContactLastName, clientContactEmail, clientContactPhone])

    return (
        <div className="flex flex-row-reverse w-full gap-4">
            <div className="bg-darkbg rounded-md h-[5vh] p-1 flex">
                <button
                    className="w-[10vw] text-lightbg disabled:text-slate-400"
                    onClick={addClient}
                    disabled={missingField ? true : false}
                >
                    <IoIosAdd className="w-10 h-10 inline" /> Agregar
                </button>
            </div>
            <div className="bg-darkbg rounded-md h-full grow p-1 m-auto flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Nombre del Cliente
                        <input
                            value={clientName}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="Cemaco"
                            onChange={(e) => { setClientName((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Nombre del contacto
                        <input
                            value={clientContactName}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="José"
                            onChange={(e) => { setClientContactName((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Apellido del contacto
                        <input
                            value={clientContactLastName}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="Perez"
                            onChange={(e) => { setClientContactLastName((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Telefono del contacto*
                        <input
                            value={clientContactPhone}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="40284946"
                            type="number"
                            max={99999999}
                            min={10000000}
                            step={1}
                            onChange={(e) => { clientContactPhone.length > 7 ? setClientContactPhone(clientContactPhone) : setClientContactPhone((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                    <label className="text-lightbg font-bold">
                        Correo del contacto*
                        <input
                            value={clientContactEmail}
                            autoComplete="off"
                            className="w-full rounded-md py-1 px-5 text-darkbg"
                            placeholder="jose.perez@correo.com"
                            type="email"
                            pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            onChange={(e) => { setClientContactEmail((e.target as HTMLInputElement).value) }}
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}
