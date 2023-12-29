'use client'

import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function ClientCard({ oClientName, oContactName, oContactLastName, oContactPhone, oContactEmail }) {
    // Vars
    const [isHidden, setIsHidden] = useState(true)
    const [isEditable, setIsEditable] = useState(false)

    // modify Client variables
    const [clientName, setClientName] = useState(oClientName)
    const [clientContactName, setClientContactName] = useState(oContactName)
    const [clientContactLastName, setClientContactLastName] = useState(oContactLastName)
    const [clientContactPhone, setClientContactPhone] = useState(oContactPhone)
    const [clientContactEmail, setClientContactEmail] = useState(oContactEmail)

    return (
        <div className="overflow-hidden">
            <button
                className="flex justify-between w-full bg-darkbg rounded-md text-brand-color shadow-md p-2 font-bold"
                onClick={() => setIsHidden(!isHidden)}
            >
                <span>{clientName}</span>
                <IoIosAdd size={25} />
            </button>
            <div className={`grid bg-white rounded-md p-2 overflow-hidden transition-all duration-300 ease-in-out text-darkbg
            ${isHidden ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                <div className="overflow-hidden flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-brand-color font-bold">
                            Nombre del Cliente
                            <input
                                value={clientName}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientName((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-brand-color font-bold">
                            Nombre del contacto
                            <input
                                value={clientContactName}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactName((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-brand-color font-bold">
                            Apellido del contacto
                            <input
                                value={clientContactLastName}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactLastName((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-brand-color font-bold">
                            Telefono del contacto
                            <input
                                value={clientContactPhone}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactPhone((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-brand-color font-bold">
                            Correo del contacto
                            <input
                                value={clientContactEmail}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactEmail((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                        <button 
                            className="m-auto bg-darkbg text-brand-color p-2 rounded-md"
                            onClick={() => setIsEditable(!isEditable)}
                        >
                            { isEditable ? 'Guardar' : 'Editar' }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}