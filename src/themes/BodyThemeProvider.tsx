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
            // Handle what happens when the theme is "system"
            const system_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            return {
                style: system_theme,
                theme: "system"
            }
        }

        // Simply return the theme that's in use.
        return {
            style: theme,
            theme: theme
        }
    }

    // Reset the theme to default
    // if not allowed.
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

    // Set the theme using the "data-theme" attribute.
    body.setAttribute("data-theme", parsedTheme.style);

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
    
    return <body className={className} data-theme={renderTheme}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    </body>
}