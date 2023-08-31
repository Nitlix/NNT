import { getLocale } from "nitlix-i18n"

const pageTranslations = {
    en: {
        welcome: "Welcome!"
    }
}
export default function(){
    const lang = getLocale("lang");
    return <>
        <h3 style={{width: "100%", height: "100vh"}} className="flex center">
            {
                pageTranslations[lang].welcome
            }
        </h3>
    </>
}
