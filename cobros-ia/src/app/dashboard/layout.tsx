import Footer from "@/components/Footer"
import SideBar, { SidebarItem } from "@/components/SideBar"
import { CiHome, CiShop, CiMail } from "react-icons/ci";


export default function DashboardLayout({ children }) {

    return (
        <>
        <div className="w-full h-screen bg-lightbg">
            <SideBar>
                <SidebarItem
                    icon={<CiHome size={20} />}
                    text={"Menú"}
                    path={"/dashboard/home"}
                    active={true}
                    alert={true}
                />
                <SidebarItem
                    icon={<CiShop size={20} />}
                    text={"Clientes"}
                    path={"/dashboard/clients"}
                    active={false}
                    alert={false}
                />
                <SidebarItem
                    icon={<CiMail size={20} />}
                    text={"Comunicación"}
                    path={"/dashboard/messages"}
                    active={false}
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