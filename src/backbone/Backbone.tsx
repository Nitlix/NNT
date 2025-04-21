"use client";

// ================================
// Backbone
//
// Designed to superpower your app
// silently and efficiently.
//
// with love, by Nitlix
// ================================

import { useEffect, useState, createContext } from "react";
import "./Backbone.scss";
import { setClientCookie } from "nitlix-client";

// Massive props to Studio Freight for creating Lenis.
import Lenis from "lenis";
import {
    ThemeRetrieverResult,
    configParser as themeConfigParser,
    Theme,
    Style,
} from "nitlix-themes";
import NParallax from "nparallax";
import { useRouter } from "next/navigation";
import { LenisScrolltoProperties } from "@/var/types";

// ================================
// Navigation Context
type NavigationContextType = {
    navigating: boolean;
    setNavigating: React.Dispatch<React.SetStateAction<boolean>>;
    navigate: (url: string, scroll?: boolean) => void;
    transitionActive: boolean;
    setTransitionActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavigationContext = createContext<NavigationContextType>(
    null as any
);

// ================================

// ================================
// Theme Context
// ================================

type ThemeContextType = {
    style: Style;
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export const ThemeContext = createContext<ThemeContextType>(null as any);

// =================================================
// SP Context
// -> Using Lenis, a native scroll solution.
// -> Using NParallax, a native parallax solution.
// =================================================
type Scroll = Lenis;

type SPContextType = {
    scroll: Scroll | null;
    SPController: SPController;
    setSPController: React.Dispatch<React.SetStateAction<SPController>>;
    // Parallax stuff
    getParallax: () => NParallax | null; // Get it directly
    parallax: NParallax | null; // When you want to listen
    setParallax: React.Dispatch<React.SetStateAction<NParallax | null>>;
};

type SPController = "ALLOWINIT" | "DISABLE" | "ENABLE" | "IDLE";

export const SPContext = createContext<SPContextType>(null as any);

function check(
    theme: Theme,
    allowedThemes: Theme[],
    defaultTheme: Theme,
    defaultStyle: Style
): {
    style: Style;
    theme: Theme;
} {
    if (allowedThemes.includes(theme)) {
        if (theme === "system") {
            // Handle what happens when the theme is "system"
            const system_theme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";
            return {
                style: system_theme as Style,
                theme: "system",
            };
        }

        // Simply return the theme that's in use.
        return {
            style: theme as Style,
            theme: theme,
        };
    }

    // Reset the theme to default
    // if not allowed.
    else {
        return {
            style: defaultStyle,
            theme: defaultTheme,
        };
    }
}

type BackboneProps = {
    children: React.ReactNode;
    className?: string;
    themeRetriever: ThemeRetrieverResult;
};

export default function ({
    children,
    className = "",
    themeRetriever,
}: BackboneProps) {
    if (!themeRetriever) {
        console.error("A themeRetriever object is required.");
    }

    function applyTheme(
        theme: Theme,
        allowedThemes: Theme[],
        defaultTheme: Theme,
        defaultStyle: Style,
        themeCookie: string,
        lastStyleCookie: string
    ) {
        const body = document.querySelector("body") as HTMLBodyElement;
        const parsedTheme = check(
            theme,
            allowedThemes,
            defaultTheme,
            defaultStyle
        );

        // Set the theme using the "data-theme" attribute.
        body.setAttribute("data-theme", parsedTheme.style);
        setStyle(parsedTheme.style);

        setClientCookie(themeCookie, parsedTheme.theme, 365);
        setClientCookie(lastStyleCookie, parsedTheme.style, 365);
    }

    const themeConfig = themeConfigParser(themeRetriever.config);

    const [theme, setTheme] = useState<Theme>(themeRetriever.theme);
    const [style, setStyle] = useState<Style>(themeRetriever.lastStyle);

    let renderTheme = themeRetriever.lastStyle;
    if (theme != "system") {
        renderTheme = theme;
    }

    //================================
    // Client Side Theme Check
    //================================
    useEffect(() => {
        applyTheme(
            theme,
            themeConfig.allowedThemes,
            themeConfig.defaultTheme,
            themeConfig.defaultStyle,
            themeConfig.themeCookie,
            themeConfig.lastStyleCookie
        );
    }, [theme]);

    //================================
    // SP Section
    // Feel free to edit/remove this.
    //================================
    const [scroll, setScroll] = useState<Lenis | null>(null);
    const [parallax, setParallax] = useState<NParallax | null>(null);
    const [SPController, setSPController] = useState<SPController>("ALLOWINIT");

    function onResize() {
        if (window.innerWidth < 1024) {
            setSPController("DISABLE");
        } else {
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
                        : x < 0.5
                        ? Math.pow(2, 20 * x - 10) / 2
                        : (2 - Math.pow(2, -20 * x + 10)) / 2;
                },
                lerp: 0.15,
            });

            const np = new NParallax();

            function raf(time: number) {
                ls.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            setScroll(ls);
            setParallax(np);
        }

        function destroySP() {
            getScroll()?.destroy();
            getParallax()?.destroy();
        }

        switch (SPController) {
            case "ALLOWINIT":
                if (window.innerWidth > 1024) {
                    setSPController("ENABLE");
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
        };
    }, [SPController]);

    useEffect(() => {
        window.addEventListener("resize", onResize);
    }, []);
    //==============
    // End of SP
    //==============

    //=============================================
    // Navigation Section
    // Feel free to edit/remove this.
    //=============================================
    const [navigating, setNavigating] = useState(false);
    const [transitionActive, setTransitionActive] = useState(false);
    const router = useRouter();

    async function navigate(
        url: string,
        scroll = false,
        scrolltoProperties: LenisScrolltoProperties = {}
    ) {
        const currentPage = window.location.pathname.split("#")[0];
        const newPage = url.split("#")[0];
        const newLocation = url.split("#").length > 1 ? url.split("#")[1] : "";

        if (currentPage == newPage) {
            // Refresh
            window.location.reload();
            return;
        } else {
            setNavigating(true);
            router.push(url, {
                scroll: false,
            });

            setTimeout(() => {
                if (newLocation) {
                    // Attempt to scroll
                    if (SPController == "ENABLE" && scroll) {
                        getScroll()?.scrollTo(newLocation, scrolltoProperties);
                    } else {
                        if (scroll) {
                            // Try to get element
                            const el = document.getElementById(
                                newLocation.replace("#", "")
                            );
                            if (el) {
                                el.scrollIntoView();
                            } else {
                                // Fall back to the top
                                window.scrollTo(0, 0);
                            }
                        }
                    }
                } else {
                    if (SPController == "ENABLE" && scroll) {
                        getScroll()?.scrollTo(0, scrolltoProperties);
                    } else {
                        if (scroll) {
                            window.scrollTo(0, 0);
                        }
                    }
                }
            }, 250);
        }
    }

    return (
        <body className={className} data-theme={renderTheme}>
            <NavigationContext.Provider
                value={{
                    navigating,
                    setNavigating,
                    navigate,
                    transitionActive,
                    setTransitionActive,
                }}
            >
                <ThemeContext.Provider value={{ theme, style, setTheme }}>
                    <SPContext.Provider
                        value={{
                            scroll,
                            SPController,
                            setSPController,
                            parallax,
                            setParallax,
                            getParallax,
                        }}
                    >
                        {children}
                    </SPContext.Provider>
                </ThemeContext.Provider>
            </NavigationContext.Provider>
        </body>
    );
}
