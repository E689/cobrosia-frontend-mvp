'use client'

import Link from "next/link"
import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const NavBar = () => {
    const [nav, setNav] = useState(false)
    const [titleText, setTitleText] = useState('Inicio')

    const handleNav = () => {
        setNav(!nav)
    }

    useEffect(() => {
        const changeTitle = () => {
            /** Window scroll variables. */
            let wS = window.scrollY
            //console.log(wS)

            if (document.getElementById('home') &&
                document.getElementById('about') &&
                document.getElementById('contact')) {

                /** Home position */
                let hT = document.getElementById('home').offsetTop
                //console.log(wS, hT, 'Home')

                /** About position */
                let aT = document.getElementById('about').offsetTop
                //console.log(wS, aT, 'About')

                /** Contact position */
                let eT = document.getElementById('contact').offsetTop
                //console.log(wS, eT, 'Contact')

                if (wS >= hT && wS <= ((hT + aT) / 2)) { setTitleText('Inicio') }
                if (wS >= aT && wS <= ((aT + eT) / 2)) { setTitleText('Acerca de nosotros') }
                if (wS >= eT) { setTitleText('Contactanos') }
            }
        }

        window.addEventListener('scroll', changeTitle)
    })

    return (
        <div id='nav' className='fixed left-0 top-0 w-full bg-darkbg text-brand-color z-20 h-24'>
            <div className='m-auto flex justify-between items-center p-4 text-inverted-space h-full'>
                <h1 className='font-bold text-2xl hover:text-switch-purple'>{titleText}</h1>

                {/** Web Nav */}
                <ul className='hidden md:flex z-20'>
                    <li className='p-4 hover:text-switch-purple'>
                        <Link href='/home#home'>Inicio</Link>
                    </li>
                    <li className='p-4 hover:text-switch-purple'>
                        <Link href='/home#about'>Sobre nosotros</Link>
                    </li>
                    <li className='p-4 hover:text-switch-purple'>
                        <Link href='/home#contact'>Contactanos</Link>
                    </li>
                    <li className='p-4 hover:text-switch-purple'>
                        <Link href='/login'>Iniciar Sesión</Link>
                    </li>
                </ul>

                {/** Mobile Nav */}
                <div className='block md:hidden z-10' onClick={handleNav}>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                <div className={`absolute md:hidden top-0 ${nav ? 'left-0' : 'left-full'} flex justify-center items-center text-center w-full h-screen bg-darkslategray/80 ease-in duration-300`}>
                    <ul>
                        <li className='p-5 text-4xl hover:text-switch-purple' onClick={handleNav}>
                            <Link href='/#'>Inicio</Link>
                        </li>
                        <li className='p-5 text-4xl hover:text-switch-purple' onClick={handleNav}>
                            <Link href='/#about'>Sobre nosotros</Link>
                        </li>
                        <li className='p-5 text-4xl hover:text-switch-purple' onClick={handleNav}>
                            <Link href='/#contact'>Contactanos</Link>
                        </li>
                        <li className='p-4 hover:text-switch-purple'>
                            <Link href='/login'>Iniciar Sesión</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar