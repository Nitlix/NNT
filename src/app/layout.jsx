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
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <ServerProvider className={inter.className}>
                {children}
            </ServerProvider>
        </html>
    )
}
