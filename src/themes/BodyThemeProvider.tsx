"use client";

import { useEffect, useState, createContext } from "react";
import "./locomotiveScroll.scss";
import { setClientCookie } from "nitlix-client";
import LocomotiveScroll from "locomotive-scroll";

// ================================
// Theme Context
// ================================
type ThemeContextType = {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}
export const ThemeContext = createContext<ThemeContextType>(null as any);


// ================================
// Locomotive Scroll Context
// ================================
type LocomotiveScrollContextType = {
    getLS: ()=>LocomotiveScroll | null,
    initLS: ()=>void,
    usingLS: number | boolean,
    setUsingLS: React.Dispatch<React.SetStateAction<number | boolean>>
}
export const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>(null as any);



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

    setClientCookie(themeCookie, parsedTheme.theme, 365);
    setClientCookie(lastThemeCookie, parsedTheme.style, 365);
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
    const [LS, setLS] = useState<LocomotiveScroll | null>(null);
    const [usingLS, setUsingLS] = useState<number | boolean>(7);
    function getLS(){
        return LS;
    }

    function initLS(){
        import("locomotive-scroll").then(locomotiveModule => {
            const LocomotiveScroll = locomotiveModule.default
            const ls = new LocomotiveScroll({
                el: document.querySelector("[data-scroll-container]") as HTMLElement,
                smooth: true,
            })

            setLS(ls);
        })
    }

    function resizeAction(){
        const ua = navigator.userAgent;
        const mobile = ua.match(/(iPhone)|(iPod)|(android)|(webOS)/i);
        
        if ((window.innerWidth > 1024) && !mobile && !usingLS){
            setUsingLS(true);
        }
        
        if (((window.innerWidth <= 1024) || mobile) && usingLS){
            setUsingLS(false);
        }

        if (usingLS){
            getLS()?.update();
        }
    }


    useEffect(()=>{
        if (usingLS == 7){
            setUsingLS(true)
            return;
        }

        if (usingLS){
            initLS();
        }
        else {
            const ls = getLS() as LocomotiveScroll;
            ls.destroy()
        }

        // Bind to resize event
        window.addEventListener("resize", resizeAction);

        // Cleanup
        return ()=>{
            document.removeEventListener("resize", resizeAction);
            if (usingLS) getLS()?.destroy();
        }
    }, [usingLS]);
    // End of Locomotive Scroll



    return <body className={className} data-theme={renderTheme}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            <LocomotiveScrollContext.Provider value={{getLS, initLS, usingLS, setUsingLS}}>
                {children}
            </LocomotiveScrollContext.Provider>
        </ThemeContext.Provider>
    </body>
}