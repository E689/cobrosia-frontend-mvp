'use client'

import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function BillsCard({ originalData, clients }) {
    // Vars
    const [isHidden, setIsHidden] = useState(true)
    const [isEditable, setIsEditable] = useState(false)
    const [isLogUp, setIsLogUp] = useState(false)

    // Context vars
    const [reminder, setReminder] = useState("")
    const [editDueDate, setEditDueDate] = useState(false)
    const [priority, setPriority] = useState("")
    const [other, setOther] = useState("")


    // Add Bill variables
    const [billAmount, setBillAmount] = useState(originalData.billAmount)
    const [billDueDate, setBillDueDate] = useState(originalData.billDueDate)
    const [billStatus, setBillStatus] = useState(originalData.billStatus)
    const [billClientID, setBillClientID] = useState(originalData.billClientID)
    const [billClientName, setBillClientName] = useState(originalData.billClientName)
    const [billId, setBillId] = useState(originalData.billId)
    const [billContext, setBillContext] = useState(originalData.billContext)

    useEffect(() => {
        if (billContext) {
            setReminder(billContext.reminder)
            setEditDueDate(billContext.editDueDate)
            setPriority(billContext.priority)
            setOther(billContext.other)
        }
    }, [billContext])

    return (
        <div className="overflow-hidden">
            <button
                className="flex justify-between w-full bg-classy-blue hover:bg-classy-light-blue rounded-md text-lightbg shadow-md p-2 font-bold"
                onClick={() => setIsHidden(!isHidden)}
            >
                <span>{billId}</span>
                <span>{billClientName}</span>
                <span>{billDueDate}</span>
                <IoIosAdd size={25} />
            </button>
            <div className={`grid bg-white rounded-md p-2 overflow-hidden transition-all duration-300 ease-in-out text-darkbg
            ${isHidden ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                <div className="overflow-hidden grid grid-rows-[1fr] gap-1">
                    <div className="overflow-hidden flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                            <label className="text-black font-bold">
                                No. Factura
                                <input
                                    name={`billId_${billClientID}`}
                                    value={billId}
                                    disabled={!isEditable}
                                    autoComplete="off"
                                    className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                    placeholder=" - "
                                    onChange={(e) => { setBillId((e.target as HTMLInputElement).value) }}
                                />
                            </label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                            <label className="text-black font-bold">
                                Nombre del cliente
                                <select
                                    name={`billClientID_${billClientID}`}
                                    value={billClientID}
                                    disabled={!isEditable}
                                    onChange={(e) => { setBillClientID((e.target as HTMLSelectElement).value) }}
                                    className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
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
                            <label className="text-black font-bold">
                                Fecha de Cobro
                                <input
                                    name={`billDueDate_${billClientID}`}
                                    value={billDueDate}
                                    disabled={!isEditable}
                                    autoComplete="off"
                                    type="date"
                                    className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                    onChange={(e) => { setBillDueDate((e.target as HTMLInputElement).value) }}
                                />
                            </label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                            <label className="text-black font-bold">
                                Estado
                                <select
                                    name={`billStatus_${billClientID}`}
                                    value={billStatus}
                                    disabled={!isEditable}
                                    onChange={(e) => { setBillStatus((e.target as HTMLSelectElement).value) }}
                                    className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="inProgress">En cobranza</option>
                                    <option value="collected">Cobrada</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                            <label className="text-black font-bold">
                                Monto (Q)
                                <input
                                    name={`billAmount_${billClientID}`}
                                    value={billAmount}
                                    disabled={!isEditable}
                                    autoComplete="off"
                                    className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
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
                    <div className="overflow-hidden flex flex-wrap">
                        <div className="w-full mb-4 px-2 grid grid-rows-[1fr] gap-2">
                            <div className="w-full flex bg-classy-light-blue">
                                <span className="m-auto font-bold text-black">Instrucciones</span>
                            </div>
                            <div className="overflow-hidden flex flex-wrap">
                                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                                    <label className="text-black font-bold">
                                        <span>Recordatorio:</span>
                                        <div className="flex flex-row gap-1">
                                            <span className="m-auto">Cada: </span>
                                            <input
                                                name={`context-reminder_${billClientID}`}
                                                value={reminder}
                                                disabled={!isEditable}
                                                autoComplete="off"
                                                className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                                placeholder="1"
                                                type="number"
                                                onChange={(e) => { setReminder((e.target as HTMLInputElement).value) }}
                                            />
                                            <span className="m-auto">Dia(s)</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                                    <label className="text-black font-bold m-auto flex gap-1">
                                        <span>Permite mover fecha de pago:</span>
                                        <input
                                            name={`context-editDueDate_${billClientID}`}
                                            checked={editDueDate}
                                            disabled={!isEditable}
                                            className="m-auto h-5 w-5"
                                            type="checkbox"
                                            onChange={(e) => { setEditDueDate(!editDueDate) }}
                                        />
                                    </label>
                                </div>
                                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
                                    <label className="text-black font-bold">
                                        <span>Prioridad:</span>
                                        <select
                                            name={`context-priority_${billClientID}`}
                                            value={priority}
                                            disabled={!isEditable}
                                            onChange={(e) => { setPriority((e.target as HTMLSelectElement).value) }}
                                            className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                        >
                                            <option value="0">Bajo</option>
                                            <option value="1">Medio</option>
                                            <option value="2">Alto</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="overflow-hidden flex">
                                <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 grow">
                                    <label className="m-auto flex flex-col gap-1 text-black font-bold">
                                        <span>Otras instrucciones:</span>
                                        <textarea 
                                            name={`context-other_${billClientID}`}
                                            value={other}
                                            disabled={!isEditable}
                                            autoComplete="off"
                                            className="w-full rounded-md py-1 px-5 text-darkbg ring-1 ring-darkbg"
                                            placeholder="Responder con respeto"
                                            rows={4}
                                            onChange={(e) => { setOther((e.target as HTMLTextAreaElement).value) }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden flex flex-row-reverse">
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                            <button
                                className="m-auto bg-red-600 hover:bg-red-500 text-lightbg font-bold p-2 rounded-md"
                                onClick={() => setIsEditable(!isEditable)}
                            >
                                Eliminar
                            </button>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                            <button
                                className="m-auto bg-classy-blue hover:bg-classy-light-blue text-lightbg font-bold p-2 rounded-md"
                                onClick={() => setIsEditable(!isEditable)}
                            >
                                {isEditable ? 'Guardar' : 'Editar'}
                            </button>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                            <button
                                className="m-auto bg-classy-blue hover:bg-classy-light-blue text-lightbg font-bold p-2 rounded-md"
                                
                            >
                                Cargar Archivo
                            </button>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 flex">
                            <button
                                className="m-auto bg-classy-blue hover:bg-classy-light-blue text-lightbg font-bold p-2 rounded-md"
                                onClick={() => setIsLogUp(!isLogUp)}
                            >
                                Ver Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}