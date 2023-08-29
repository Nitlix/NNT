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
import { cookies } from 'next/headers'
import Provider from "@/themes/Provider"
import firstHandler from "@/themes/firstHandler"

// =====================
// Metadata Export
// =====================
import metaGen from '@/modules/metaGen'
export const metadata = metaGen();

// =====================
// Layout Export
// =====================H
export default function RootLayout({ children }) {
    const themeHandlerData = firstHandler(cookies());
    console.log("🚀 ~ file: layout.jsx:36 ~ RootLayout ~ themeHandlerData:", themeHandlerData)
    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <Provider className={inter.className} handlerData={themeHandlerData}>
                {children}
            </Provider>
        </html>
    )
}
