export default function DashboardLayout({ children }) {
    return (
        <>
        <div>
            <div>Side bar</div>
            <div>{children}</div>
        </div>
        <footer>This is the footer</footer>
        </>
    )
}