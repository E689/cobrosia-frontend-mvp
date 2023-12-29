'use client'

import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function ClientCard({ oClientName, oContactName, oContactLastName, oContactPhone, oContactEmail, clientId }) {
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
                className="flex justify-between w-full bg-classy-blue hover:bg-classy-light-blue rounded-md text-lightbg shadow-md p-2 font-bold"
                onClick={() => setIsHidden(!isHidden)}
            >
                <span>{clientName}</span>
                <IoIosAdd size={25} />
            </button>
            <div className={`grid bg-white rounded-md p-2 overflow-hidden transition-all duration-300 ease-in-out text-darkbg
            ${isHidden ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                <div className="overflow-hidden flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-black font-bold">
                            Nombre del Cliente
                            <input
                                name={`clientName_${clientId}`}
                                value={clientName}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientName((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-black font-bold">
                            Nombre del contacto
                            <input
                                name={`clientContactName_${clientId}`}
                                value={clientContactName}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactName((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-black font-bold">
                            Apellido del contacto
                            <input
                                name={`clientContactLastName_${clientId}`}
                                value={clientContactLastName}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactLastName((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-black font-bold">
                            Telefono del contacto
                            <input
                                name={`clientContactPhone_${clientId}`}
                                value={clientContactPhone}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactPhone((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                        <label className="text-black font-bold">
                            Correo del contacto
                            <input
                                name={`clientContactEmail_${clientId}`}
                                value={clientContactEmail}
                                disabled={!isEditable}
                                autoComplete="off"
                                className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                placeholder=" - "
                                onChange={(e) => { setClientContactEmail((e.target as HTMLInputElement).value) }}
                            />
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                        <button 
                            className="m-auto bg-classy-blue hover:bg-classy-light-blue text-lightbg font-bold p-2 rounded-md"
                            onClick={() => setIsEditable(!isEditable)}
                        >
                            { isEditable ? 'Guardar' : 'Editar' }
                        </button>
                        <button 
                            className="m-auto bg-classy-blue hover:bg-classy-light-blue text-lightbg font-bold p-2 rounded-md"
                            onClick={() => setIsEditable(!isEditable)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}