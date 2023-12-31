import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Providers from './Providers'

// Tostify imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  )
}
