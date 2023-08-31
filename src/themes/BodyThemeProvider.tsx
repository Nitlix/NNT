"use client";

import React, { useEffect, useState, createContext } from "react";

// ================================
// Theme Context
// ================================
type ThemeContextType = {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}
export const ThemeContext = createContext<ThemeContextType>(null as any);

function check(theme: string, allowedThemes: string[], defaultTheme: string){
    if (allowedThemes.includes(theme)){
        if (theme === "system"){
            const system_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            if (system_theme === "dark"){
                return {
                    style: "dark",
                    theme: "system"
                }
            }
            return {
                style: "light",
                theme: "system"
            }
        }

        return {
            style: theme,
            theme: theme
        }
    }
    else {
        return {
            style: defaultTheme,
            theme: defaultTheme
        }
    }
}


function applyTheme(theme: string, allowedThemes: string[], defaultTheme: string, themeCookie: string, lastThemeCookie: string){
    const body = document.querySelector("body") as HTMLBodyElement;
    const parsedTheme = check(theme, allowedThemes, defaultTheme);

    body.classList.remove("dark", "light");
    body.classList.add(parsedTheme.style);

    document.cookie = `${themeCookie}=${parsedTheme.theme};path=/;max-age=31536000`;
    document.cookie = `${lastThemeCookie}=${parsedTheme.style};path=/;max-age=31536000`
}



type BodyThemeProviderProps = {
    children: React.ReactNode,
    className?: string,
    themeRetriever: {
        theme: string,
        lastTheme: string,
        config: {
            allowedThemes?: string[],
            defaultTheme?: string,

            themeCookie?: string,
            lastThemeCookie?: string,
        }
    }
}

export default function({children, className="", themeRetriever}: BodyThemeProviderProps){ 
    if (!themeRetriever){
        console.error("A themeRetriever object is required.");
    }
    
    const {
        allowedThemes = ['light', 'dark', 'system'],
        defaultTheme = 'system',

        themeCookie = 'theme',
        lastThemeCookie = 'last-theme',
    } = themeRetriever.config;


    const [theme, setTheme] = useState(themeRetriever.theme);

    let renderTheme = themeRetriever.lastTheme;
    if (theme != "system"){
        renderTheme = theme;
    }

    //================================
    // Client Side Theme Check
    //================================
    useEffect(()=>{
        applyTheme(theme, allowedThemes, defaultTheme, themeCookie, lastThemeCookie);
    },[theme]);
    
    return <body className={`${className} ${renderTheme}`}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    </body>
}