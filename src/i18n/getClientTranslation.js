import { useContext } from 'react'
import { LanguageContext } from '@/modules/Provider'
import translations from './translations'

export default function(translation){
    const lang = useContext(LanguageContext)

    if (translations[lang] && translations[lang][translation]) {
        return translations[lang][translation]
    }
    return `Translation ${translation} not found for language ${lang}.`
}