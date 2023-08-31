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
// Metadata Export
// =====================
import { metaGen } from 'nitlix-metagen'
export const metadata = metaGen()

// =====================
// Theme Provider
// =====================
import { themeRetriever } from 'nitlix-themes'
import BodyThemeProvider from '@/themes/BodyThemeProvider'
import themeSettings from "@/themes/settings"


// =====================
// Layout Export
// =====================
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <BodyThemeProvider className={inter.className} themeRetriever={themeRetriever(themeSettings)}>
                {children}
            </BodyThemeProvider>
        </html>
    )
}
