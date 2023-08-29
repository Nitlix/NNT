"use client";
import { useEffect, useState, createContext } from "react";
import MAIN from "@/var/main"
import settings from "@/themes/settings"

const allowedThemes = settings.allowed;
const defaultTheme = settings.default;

export const ThemeContext = createContext();

function check(theme){
    if (allowedThemes.includes(theme)){
        if (theme === "system"){
            //check system theme
            const system_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            if (system_theme === "dark"){
                return "dark";
            }
            return "light";
        }

        return theme;
    }
    else {
        return defaultTheme;
    }
}


function applyTheme(theme){
    const body = document.querySelector("body");
    const parsedTheme = check(theme);

    body.classList.remove("dark", "light");
    body.classList.add(parsedTheme);

    localStorage.setItem("theme", parsedTheme);
    document.cookie = `theme=${parsedTheme};path=/;max-age=31536000`;
}


export default function({children, className="", serverTheme=""}){
    const [theme, setTheme] = useState(serverTheme);

    //================================
    // Client Side Theme Check
    //================================
    useEffect(()=>{
        applyTheme(theme);
    },[theme])

    return <body className={`${className} ${serverTheme}`}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            <main className={MAIN}>
                {children}
            </main>
        </ThemeContext.Provider>
    </body>
}