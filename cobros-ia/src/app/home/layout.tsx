import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

export default function LandingLayout({ children }) {
    return(
        <>
        <NavBar />
        <section>{children}</section>
        <Footer />
        </>
    )
}