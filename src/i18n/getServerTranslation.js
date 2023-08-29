import { headers } from "next/headers"
import settings from "./settings"
import translations from "./translations"

export default function(translation){
    const lang = headers().get(settings.langHeader)
    if (translations[lang] && translations[lang][translation]) {
        return translations[lang][translation]
    }
    return `Translation ${translation} not found for language ${lang}.`
}