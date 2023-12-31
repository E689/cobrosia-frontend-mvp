'use client'

import { getSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import ClientForm from "@/components/client/ClientForm";
import ClientCard from "@/components/client/ClientCard";

export default function Clients() {
    // Vars
    const [clients, setClients] = useState(null)
    const [clientAdded, setClientAdded] = useState(false)
    const [searchClient, setSearchClient] = useState("")

    // Session
    const session = getSession()
    const [userId, setUserId] = useState(null)

    // Functions
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

    // Procedures
    session.then((res) => {
        if (res) setUserId(res.user.id)
    })

    useEffect(() => {
        if (clientAdded) setClientAdded(false)
        if (userId) loadClients()
    }, [userId, clientAdded, loadClients])

    return (
        <div className="h-fit flex flex-col gap-4 py-20 px-20">
            <div className="flex flex-row w-full">
                <div className="flex grow h-[10vh] p-4">
                    <input
                        id="searchBar"
                        value={searchClient}
                        autoComplete="on"
                        className="w-full rounded-md py-1 px-5 text-darkbg font-bold"
                        placeholder="Nombre de cliente"
                        onChange={(e) => { setSearchClient((e.target as HTMLInputElement).value) }}
                    />
                </div>
            </div>

            <ClientForm
                userId={userId}
                setClientAdded={setClientAdded}
            />

            <div className="flex flex-col w-full gap-2">
                {
                    clients ? (
                        clients.filter((client) => client.clientName.includes(searchClient)).map((client) => {
                            return (
                                <ClientCard 
                                    oClientName={client.clientName}
                                    oContactName={client.contactName}
                                    oContactLastName={client.contactlastName}
                                    oContactPhone={client.phone}
                                    oContactEmail={client.email}
                                    clientId={client._id}
                                    key={client._id}
                                />
                            )
                        })
                    ) : (
                        <div className="bg-classy-blue rounded-md grow p-4 flex flex-col gap-2">
                            <div className="flex m-auto text-lightbg font-bold">
                                <h1>No hay clientes para mostrar...</h1>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}