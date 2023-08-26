export default function(overrides={}){
    
    const data = {
        title: 'App',
        description: 'A new app generated with the default Nitlix Next.JS App Router Template.',
        site_name: 'Nitlix',
        theme: {
            color: '#FFFFFF',
        },
        language: 'en_GB',
        images: [
            {
                url: "https://www.nitlix.pro/assets/img/embed/dark.webp",
                width: 1280,
                height: 720,
            }
        ],
        type: 'website',
        url: 'https://www.nitlix.pro',
        keywords: [],
        ...overrides
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            locale: data.language,
            type: data.type,
            images: data.images,
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
}