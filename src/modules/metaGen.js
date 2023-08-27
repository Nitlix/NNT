import NAME from "../var/NAME"

export default function(overrides={}){
    const data = {
        title: NAME,
        description: 'A new pre-packed nitlix app.',
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
        twitter: {
            creator: {
                id: "1334566862479380480",
                tag: "@nitlixis",
            },
            site: "1334566862479380480",
            card: "summary_large_image",

        },
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
        },
        themeColor: data.theme.color,
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
        },
        twitter: {
            card: data.twitter.card,
            title: data.title,
            description: data.description,
            siteId: data.twitter.site,
            creator: data.twitter.creator.tag,
            creatorId: data.twitter.creator.id,
            images: data.images.map((image) => {
                return image.url
            }),
        }
    }
}