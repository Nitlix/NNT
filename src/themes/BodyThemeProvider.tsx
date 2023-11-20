"use client";

import { useEffect, useState, createContext } from "react";

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

    
    // ================================
    // Also using Locomotive Scroll
    // Feel free to edit/remove this.
    // ================================
    useEffect(()=>{
        const ua = navigator.userAgent;
        const mobile = ua.match(/(iPhone)|(iPod)|(android)|(webOS)/i);
        let usingLS = false;
        let LS: any = null;

        // Initialiser
        function initLS(){
            import("locomotive-scroll").then(locomotiveModule => {
                const LocomotiveScroll = locomotiveModule.default
                LS = new LocomotiveScroll({
                    el: document.querySelector("[data-scroll-container]") as HTMLElement,
                    smooth: true,
                })
            })
        }

        // Resize Action
        const resizeAction = ()=>{
            if (window.innerWidth > 1024){
                if (!mobile){
                    usingLS = true;
                    LS = initLS();
                }
                
            }
            else {
                if (usingLS){
                    usingLS = false;
                    LS.destroy();
                }
            }
        }

        // Bind to resize event
        window.addEventListener("resize", resizeAction);

        // This is run on initial load.
        if (!mobile && window.innerWidth > 1024){
            initLS();
        }

        // Cleanup
        return ()=>{
            document.removeEventListener("resize", resizeAction);
            if (usingLS){
                LS.destroy();
            }
        }
    }, [])



    return <body className={className} data-theme={renderTheme}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    </body>
}