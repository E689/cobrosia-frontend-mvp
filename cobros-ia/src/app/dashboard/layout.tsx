'use client'

import SideBar, { SidebarItem } from "@/components/SideBar"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHome, CiShop, CiMail } from "react-icons/ci";

export default function DashboardLayout({ children }) {
    // Vars
    const [selectedTab, setSelectedTab] = useState("home")
    const [expanded, setExpanded] = useState(true)
    const pathname = usePathname().split('/')

    useEffect(() => {
        setSelectedTab(pathname[pathname.length - 1])
    }, [pathname])

    return (
        <>
            <div className="w-full h-screen bg-lightbg">
                <SideBar expanded={expanded} setExpanded={setExpanded}>
                    <SidebarItem
                        icon={<CiHome size={20} />}
                        text={"Menú"}
                        path={"/dashboard/home"}
                        active={selectedTab.includes("home") ? true : false}
                        alert={false}
                    />
                    <SidebarItem
                        icon={<CiShop size={20} />}
                        text={"Clientes"}
                        path={"/dashboard/clients"}
                        active={selectedTab.includes("clients") ? true : false}
                        alert={false}
                    />
                    <SidebarItem
                        icon={<CiMail size={20} />}
                        text={"Facturas"}
                        path={"/dashboard/bills"}
                        active={selectedTab.includes("bills") ? true : false}
                        alert={false}
                    />
                </SideBar>
                <div className="h-screen overflow-x-auto">
                    {children}
                </div>
            </div>
        </>
    )
}