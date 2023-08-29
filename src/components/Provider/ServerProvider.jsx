import { cookies } from "next/headers";
import ClientProvider from "./ClientProvider";

import settings from "@/themes/settings";
const allowed_themes = settings.allowed;
const default_theme = settings.default;



function checkCookiesTheme(){
    const theme = cookies().get("theme");
    if (allowed_themes.includes(theme)){
        if (theme == "system"){
            return ""
        }
        else {
            return theme;
        }
    }
    else {
        return default_theme;
    }
}

export default function({children, className=""}){
    return <ClientProvider className={`${className}`} serverTheme={checkCookiesTheme()}>
        {children}
    </ClientProvider>
}