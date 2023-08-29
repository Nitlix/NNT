// =====================
// Global CSS Imports
// =====================
import './globals.scss'
import './flame.scss'

// =====================
// Theme CSS Imports
// =====================
import '@/themes/themes.scss'

// =====================
// Google Font (Inter)
// =====================
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// =====================
// Next Imports
// =====================
import { headers } from 'next/headers';
import Provider from "@/themes/Provider"

// =====================
// Metadata Export
// =====================
import metaGen from '@/modules/metaGen'
import firstHandler from '@/themes/firstHandler'
export const metadata = metaGen();

// =====================
// Layout Export
// =====================
export default function RootLayout({ children }) {
    const handlerData = firstHandler(headers())

    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <Provider className={inter.className} handlerData={handlerData}>
                {children}
            </Provider>
        </html>
    )
}
