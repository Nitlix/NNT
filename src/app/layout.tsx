// =====================
// Global CSS Imports
// =====================
import './globals.scss'

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
// Custom Font (Neue Montreal)
// =====================
import NeueMontreal from "@/fonts/NeueMontreal/NeueMontreal"

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
import Aos from '@/lib/Aos/Aos'


// =====================
// Layout Export
// =====================
type LayoutType = {
    children: React.ReactNode
}

export default function RootLayout({ children }: LayoutType) {
    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <BodyThemeProvider className={NeueMontreal.className} themeRetriever={themeRetriever(themeSettings)}>
                <Aos />
                <main className='_nitlix' data-scroll-container>
                    {children}
                </main>
            </BodyThemeProvider>
        </html>
    )
}
