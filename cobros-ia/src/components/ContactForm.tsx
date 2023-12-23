import React from "react";

const ContactForm = () => {

    return(
        <>
        <div className="grid grid-cols-4 gap-4 w-full h-full">
            <div className="grid grid-rows-6 col-start-2 col-span-2">
                <div className="row-span-2">
                    Title
                </div>
                <div className="row-span-1">
                    Nombre:
                </div>
                <div className="row-span-1">
                    Correo:
                </div>
                <div className="row-span-1">
                    Contactenme!
                </div>
            </div>
        </div>
        </>
    )
}

export default ContactForm