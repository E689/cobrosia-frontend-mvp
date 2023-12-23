import Image from "next/image"
import React from "react"
import ContactForm from "@/components/ContactForm"

export default function Home() {
  return (
    <main className="mt-24 bg-lightbg relative">
      <div className="w-full" id="home">
        <div className="bg-home-bg bg-cover w-full h-[85vh] absolute t-0 l-0 z-10" />
        <div className="bg-white/10 bg-cover w-full h-[85vh] absolute t-0 l-0 z-10" />
        <div className="container m-auto z-10 w-full h-[85vh] relative flex">
          <Image
            src="/logo-removebg.png"
            width="500"
            height="500"
            alt="logo png"
            className="mx-auto mt-24 max-h-[20vh] w-[50vw] px-8 py-3"
            priority={true}
          />
        </div>
      </div>
      <div className="container m-auto h-[85vh] relative flex bg-darkbg/80" id="about">
        About us...
      </div>
      <div className="container m-auto h-[85vh] relative flex bg-darkbg/80" id="contact">
        <ContactForm />
      </div>
    </main>
  )
}
