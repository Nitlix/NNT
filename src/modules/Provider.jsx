"use client";
import { useEffect, useState, createContext } from "react";
import MAIN from "@/var/main"
import settings from "@/themes/settings"
import getAuth from "@/auth/getAuth"

const allowedThemes = settings.allowed;
const defaultTheme = settings.default;


// ================================
// Theme Context
// ================================
export const ThemeContext = createContext();
export const LanguageContext = createContext();
export const AuthContext = createContext();


function check(theme){
    if (allowedThemes.includes(theme)){
        if (theme === "system"){
            const system_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            if (system_theme === "dark"){
                return {
                    apply: "dark",
                    store: "system"
                }
            }
            return {
                apply: "light",
                store: "system"
            }
        }

        return {
            apply: theme,
            store: theme
        }
    }
    else {
        return {
            apply: defaultTheme,
            store: defaultTheme
        }
    }
}


function applyTheme(theme){
    const body = document.querySelector("body");
    const parsedTheme = check(theme);

    body.classList.remove("dark", "light");
    body.classList.add(parsedTheme.apply);

    document.cookie = `${settings.themeCookie}=${parsedTheme.store};path=/;max-age=31536000`;
    document.cookie = `${settings.lastThemeCookie}=${parsedTheme.apply};path=/;max-age=31536000`
}


export default function({children, className="", handlerData, language, authData={}}){  
    const [theme, setTheme] = useState(handlerData.use);
    const [auth, setAuth] = useState(authData);

    //================================
    // Client Side Theme Check
    //================================
    useEffect(()=>{
        applyTheme(theme);
    },[theme])

    useEffect(()=>{
        getAuth(auth, setAuth)
    }, [])

    
    return <body className={`${className} ${handlerData.render}`}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            <LanguageContext.Provider value={language}>
                <AuthContext.Provider value={{auth, setAuth}}>
                    <main className={MAIN}>
                        {children}
                    </main>
                </AuthContext.Provider>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    </body>
}