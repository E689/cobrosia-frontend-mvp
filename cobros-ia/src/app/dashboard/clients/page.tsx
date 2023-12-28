'use client'

import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function Clients() {
    const [clients, setClients] = useState(null)
    const searchClient = useRef("")

    const clientName = useRef("")
    const clientContactName = useRef("")
    const clientContactLastName = useRef("")
    const clientContactPhone = useRef("")
    const clientContactEmail = useRef("")


    // Session
    const session = getSession()
    const [userId, setUserId] = useState(null)

    // Functions
    const addClient = async () => {
        const data = {
            "clientName": clientName.current,
            "contactName": clientContactName.current,
            "contactlastName": clientContactLastName.current,
            "phone": clientContactPhone.current,
            "email": clientContactEmail.current,
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
            if (res.ok) loadClients()
            return res
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
        if (userId) loadClients()
    }, [userId])

    return (
        <div className="h-fit flex flex-col gap-4 py-20 px-20">
            <div className="flex flex-row w-full">
                <div className="flex grow h-[10vh] p-4">
                    <input
                        id="searchBar"
                        autoComplete="on"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Nombre de cliente"
                        onChange={(e) => { searchClient.current = (e.target as HTMLInputElement).value }}
                    />
                </div>
            </div>

            <div className="flex flex-row-reverse w-full gap-4">
                <div className="bg-darkbg rounded-md h-[5vh] p-1 flex">
                    <button
                        className="w-[10vw] text-brand-color"
                        onClick={addClient}
                    >
                        <IoIosAdd className="w-10 h-10 inline" /> Agregar
                    </button>
                </div>
                <div className="bg-darkbg rounded-md h-[5vh] grow p-1 m-auto flex">
                    <input
                        id="clientName"
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Nombre de cliente"
                        onChange={(e) => { clientName.current = (e.target as HTMLInputElement).value }}
                    />
                    <input
                        id="contactName"
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Nombre del contacto"
                        onChange={(e) => { clientContactName.current = (e.target as HTMLInputElement).value }}
                    />
                    <input
                        id="contactlastName"
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Apellido del contacto"
                        onChange={(e) => { clientContactLastName.current = (e.target as HTMLInputElement).value }}
                    />
                    <input
                        id="phone"
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Numero del contacto"
                        onChange={(e) => { clientContactPhone.current = (e.target as HTMLInputElement).value }}
                    />
                    <input
                        id="email"
                        autoComplete="off"
                        className="w-full rounded-md py-1 px-5 text-switch-purple"
                        placeholder="Correo del contacto"
                        onChange={(e) => { clientContactEmail.current = (e.target as HTMLInputElement).value }}
                    />
                </div>
            </div>

            <div className="flex flex-row w-full">
                <div className="bg-darkbg rounded-md grow p-4 flex flex-col gap-2">
                    {
                        clients ? (
                            clients.map((client) => {

                                return (
                                    <div className="flex flex-row w-full h-10" key={client._id}>
                                        <span>{client.clientName}</span>
                                        <span>{client.contactName}</span>
                                        <span>{client.contactlastName}</span>
                                        <span>{client.phone}</span>
                                        <span>{client.email}</span>
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