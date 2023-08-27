// =====================
// Global CSS Imports
// =====================
import './globals.scss'
import './flame.scss'
import './themes.scss'

// =====================
// Google Font (Inter)
// =====================
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// =====================
// React Imports
// =====================
import ServerProvider from '@/components/Provider/ServerProvider'
import metaGen from '@/modules/metaGen'

// =====================
// Metadata Export
// =====================
export const metadata = metaGen();

// =====================
// Layout Export
// =====================
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.0.7/css/boxicons.min.css"/>
            </head>
            <ServerProvider className={inter.className}>
                {children}
            </ServerProvider>
        </html>
    )
}
