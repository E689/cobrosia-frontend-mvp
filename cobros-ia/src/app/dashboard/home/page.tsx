export default function DashboardHome() {
    return (
        <div className="h-fit flex flex-col gap-4 py-20 px-20">
            <div className="flex flex-row w-full">
                <div className="bg-darkbg rounded-md grow h-[20vh] p-4">
                    <span>Aqui se muestra información!</span>
                </div>
            </div>

            <div className="flex flex-row w-full gap-4">
                <div className="bg-darkbg rounded-md grow h-[20vh] p-4">
                    <span>Aqui tambien!</span>
                </div>
                <div className="bg-darkbg rounded-md grow h-[20vh] p-4">
                    <span>Aqui tambien!</span>
                </div>
            </div>

            <div className="flex flex-row w-full">
                <div className="bg-darkbg rounded-md grow h-[80vh] p-4">
                    <span>Aqui hay graficas!</span>
                </div>
            </div>

        </div>
    )
}