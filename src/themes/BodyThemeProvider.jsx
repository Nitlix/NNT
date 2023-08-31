"use client";

import { useEffect, useState, createContext } from "react";

// ================================
// Theme Context
// ================================
export const ThemeContext = createContext();

function check(theme, allowedThemes, defaultTheme){
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


function applyTheme(theme, allowedThemes, defaultTheme, themeCookie, lastThemeCookie){
    const body = document.querySelector("body");
    const parsedTheme = check(theme, allowedThemes, defaultTheme);

    body.classList.remove("dark", "light");
    body.classList.add(parsedTheme.style);

    document.cookie = `${themeCookie}=${parsedTheme.theme};path=/;max-age=31536000`;
    document.cookie = `${lastThemeCookie}=${parsedTheme.style};path=/;max-age=31536000`
}


export default function({children, className="", themeRetriever={}}){  
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