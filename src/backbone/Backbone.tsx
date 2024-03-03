"use client";

// ================================
// Backbone
//
// Designed to superpower your app
// silently and efficiently.
//
// Version 24.3.3 (Reworked 112 times)
// with love, by Nitlix
// ================================

import { useEffect, useState, createContext } from "react";
import "./Backbone.scss";
import { setClientCookie } from "nitlix-client";

// Massive props to Studio Freight for creating Lenis.
import Lenis from "@studio-freight/lenis";
import { ThemeRetrieverResult } from "nitlix-themes";
import NParallax from "nparallax";

// ================================
// Theme Context
// ================================
type ThemeContextType = {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}
export const ThemeContext = createContext<ThemeContextType>(null as any);


// =================================================
// SP Context
// -> Using Lenis, a native scroll solution.
// -> Using NParallax, a native parallax solution.
// =================================================
type Scroll = Lenis;

type SPContextType = {
    scroll: Scroll | null
    SPController: SPController
    setSPController: React.Dispatch<React.SetStateAction<SPController>>
    parallax: NParallax | null
}

type SPController = "ALLOWINIT" | "DISABLE" | "ENABLE" | "IDLE"



export const SPContext = createContext<SPContextType>(null as any);



function check(theme: string, allowedThemes: string[], defaultTheme: string) {
    if (allowedThemes.includes(theme)) {
        if (theme === "system") {
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

function applyTheme(theme: string, allowedThemes: string[], defaultTheme: string, themeCookie: string, lastThemeCookie: string) {
    const body = document.querySelector("body") as HTMLBodyElement;
    const parsedTheme = check(theme, allowedThemes, defaultTheme);

    // Set the theme using the "data-theme" attribute.
    body.setAttribute("data-theme", parsedTheme.style);

    setClientCookie(themeCookie, parsedTheme.theme, 365);
    setClientCookie(lastThemeCookie, parsedTheme.style, 365);
}



type BackboneProps = {
    children: React.ReactNode,
    className?: string,
    themeRetriever: ThemeRetrieverResult
}


export default function ({ children, className = "", themeRetriever }: BackboneProps) {
    if (!themeRetriever) {
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
    if (theme != "system") {
        renderTheme = theme;
    }

    //================================
    // Client Side Theme Check
    //================================
    useEffect(() => {
        applyTheme(theme, allowedThemes, defaultTheme, themeCookie, lastThemeCookie);
    }, [theme]);





    //================================
    // SP Section
    // Feel free to edit/remove this.
    //================================
    const [scroll, setScroll] = useState<Lenis | null>(null);
    const [parallax, setParallax] = useState<NParallax | null>(null);
    const [SPController, setSPController] = useState<SPController>("ALLOWINIT");


    function onResize() {
        if ((window.innerWidth < 1024)) {
            setSPController("DISABLE");
        }
        else {
            setSPController("ENABLE");
        }
    }

    function getScroll(): Lenis | null {
        return scroll;
    }

    function getParallax(): NParallax | null {
        return parallax;
    }




    // SP Main Controller
    useEffect(() => {
        function initSP() {
            const ls = new Lenis({
                easing: (x) => {
                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                                : (2 - Math.pow(2, -20 * x + 10)) / 2;
                },
                lerp: 0.15
            })

            const np = new NParallax();

            function raf(time: number) {
                ls.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)
            setScroll(ls)
            setParallax(np)
        }

        function destroySP() {
            getScroll()?.destroy();
            getParallax()?.destroy();
        }

        switch (SPController) {
            case "ALLOWINIT":
                if (window.innerWidth > 1024) {
                    initSP();
                }
                break;
            case "DISABLE":
                destroySP();
                break;
            case "ENABLE":
                initSP();
                break;
        }

        return () => {
            destroySP();
        }
    }, [SPController])

    useEffect(() => {
        window.addEventListener("resize", onResize);
    }, []);
    //==============
    // End of SP
    //==============



    return <body className={className} data-theme={renderTheme}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <SPContext.Provider value={{ scroll, SPController, setSPController, parallax }}>
                {children}
            </SPContext.Provider>
        </ThemeContext.Provider>
    </body>
}