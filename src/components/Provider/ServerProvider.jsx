import { cookies } from "next/headers";
import ClientProvider from "./ClientProvider";

const allowed_themes = ["dark", "light", "system"]
const default_theme = "dark";
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
    return <ClientProvider className={`${checkCookiesTheme()} ${className}`}>
        {children}
    </ClientProvider>
}