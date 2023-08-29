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
import ClientProvider from "@/components/Provider/ClientProvider"

// =====================
// Metadata Export
// =====================
import metaGen from '@/modules/metaGen'
export const metadata = metaGen();

// =====================
// Layout Export
// =====================
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <ClientProvider className={inter.className} serverTheme={cookies().get("theme").value}>
                {children}
            </ClientProvider>
        </html>
    )
}
