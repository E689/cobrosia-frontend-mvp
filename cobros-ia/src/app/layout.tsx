import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Providers from './Providers'

const inter = Inter({ subsets: ['latin'] })

interface IProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Cobros.ia',
  description: 'Cobros al siguiente nivel.',
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="es" className='scroll-smooth'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
