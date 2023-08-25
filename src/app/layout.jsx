import './globals.scss'
import './flame.scss'
import './themes.scss'


import { Inter } from 'next/font/google'
import ServerProvider from '@/components/Provider/ServerProvider'

const inter = Inter({ subsets: ['latin'] })



const data = {
    title: 'App',
    description: 'The default Nitlix Next.JS App Router Template',
    site_name: 'Nitlix',

    theme: {
        color: '#FFFFFF',
    },

    language: 'en_GB',
    html_lang: 'en',

    images: [
        {
            url: "https://www.nitlix.pro/assets/img/embed/dark.webp",
            width: 1280,
            height: 720,
        }
    ],

    url: 'https://www.nitlix.pro',
}

export const metadata = {
    title: data.title,
    description: data.description,
    keywords: [],
    openGraph: {
        title: data.title,
        description: data.description,
        locale: data.language,
        type: 'website',
        images: data.images,
        type: 'website',
        url: data.url,
        site_name: data.site_name,
        color: data.theme.color,
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang={data.html_lang}>
            <ServerProvider className={inter.className}>
                {children}
            </ServerProvider>
        </html>
    )
}
