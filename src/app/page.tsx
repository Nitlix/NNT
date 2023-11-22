import strretchSans from "@/fonts/STRRETCH_SANS/strretchSans";
import { Translations } from "@/i18n/translations";
import { getLocale } from "nitlix-i18n"

const pageTranslations: Translations = {
    en: {
        welcome: "WELCOME",
        more: "MORE"
    }
}


export default function(){
    const lang: any = getLocale();

    return <> 
        <h3 className={`w-full !max-w-none h-[100vh] flex justify-center items-center ${strretchSans.className}`} data-scroll data-scroll-direction="horizontal" data-scroll-speed="10">
            {
                pageTranslations[lang].welcome
            }
        </h3>
        <h3 className={`w-full !max-w-none h-[100vh] flex justify-center items-center ${strretchSans.className}`}>
            {
                pageTranslations[lang].more
            }
        </h3>
    </>
}
