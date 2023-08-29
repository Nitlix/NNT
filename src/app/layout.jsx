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
import Provider from "@/modules/Provider"
import languageSettings from "@/i18n/settings"

// =====================
// Metadata Export
// =====================
import metaGen from '@/modules/metaGen'
import firstThemeHandler from '@/modules/firstThemeHandler'
import getLoader from '@/auth/getLoader'
export const metadata = metaGen();

// =====================
// Layout Export
// =====================
export default function RootLayout({ children }) {
    const handlerData = firstThemeHandler(headers())
    const language = headers().get(languageSettings.langHeader);

    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <Provider className={inter.className} handlerData={handlerData} language={language} authData={getLoader()}>
                {children}
            </Provider>
        </html>
    )
}
