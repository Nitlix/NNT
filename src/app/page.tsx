import { getLocale } from "nitlix-i18n"

type translations = {
    [key: string]: {
        [key: string]: string | number | boolean
    }
}

const pageTranslations: translations = {
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
