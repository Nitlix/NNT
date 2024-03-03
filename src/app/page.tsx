import { Translations } from "@/i18n/translations";
import { getLocale } from "nitlix-i18n"

const pageTranslations: Translations = {
    en: {
        welcome: "Welcome to NNT 🚀",
        more: "More"
    },
    de: {
        welcome: "Willkommen bei NNT 🚀",
        more: "Mehr"
    }
}

export default function () {
    const lang: any = getLocale();

    return <>
        <h3
            className="text-[3rem] w-full !max-w-none h-[100vh] flex justify-center items-center"
            data-np-action="horizontal" data-np-speed="-1">
            {
                pageTranslations[lang].welcome
            }
        </h3>
        <h3 className="text-[3rem] w-full !max-w-none h-[100vh] flex justify-center items-center">
            {
                pageTranslations[lang].more
            }
        </h3>
    </>
}