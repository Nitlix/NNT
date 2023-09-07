import { Translations } from "@/i18n/translations";
import { getLocale } from "nitlix-i18n"

const pageTranslations: Translations = {
    en: {
        welcome: "Welcome!"
    }
}

export default function(){
    const lang: any = getLocale();

    return <>
        <h3 style={{width: "100%", height: "100vh"}} className="flex center">
            {
                pageTranslations[lang].welcome
            }
        </h3>
    </>
}
