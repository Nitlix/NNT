import { NextResponse } from 'next/server'
import { geolocation } from '@vercel/edge';

import routes from "@/i18n/routes"
import translations from "@/i18n/translations"

import themeSettings from "@/themes/settings"
import langSettings from "@/i18n/settings"



const themeCookie = themeSettings.themeCookie;
const lastThemeCookie = themeSettings.lastThemeCookie;
const langCookie = langSettings.langCookie;



export default function middleware(request) {

    // =================================
    // Create a response object
    // =================================
    const response = NextResponse.next({
        request: {
            // Apply old headers
            headers: request.headers,
            // Apply old cookies
            cookies: request.cookies
        }
    })

    // =================================
    // Define interaction functions
    // =================================
    function setCookie(name, value){
        request.cookies.set(name, value);
        response.cookies.set(name, value);
    }

    const getCookie = (name) => request.cookies.get(name);

    function setHeader(name, value){
        response.headers.set(name, value);
        request.headers.set(name, value);
    }





    //==================================================
    // Allow server components to access the URL
    //==================================================
    setHeader("x-url", request.url);



    //====================
    // Theme setting
    //====================
    let theme = getCookie(themeCookie);
    if (theme) {
        theme = theme.value.toLowerCase();
    }

    if (!themeSettings.allowed.includes(theme)) {
        theme = themeSettings.default;
        setCookie(themeCookie, themeSettings.default);
    }

    if (getCookie(lastThemeCookie)){
        setHeader(themeSettings.lastThemeHeader, getCookie(lastThemeCookie).value);
    }

    setHeader(themeSettings.themeHeader, theme);



    //====================
    // Language setting
    //====================
    let lang = getCookie(langCookie);
    if (lang){
        lang = lang.value.toLowerCase();
    }

    if(!translations[lang]) {
        const { country } = geolocation(response);
        if (routes[country]) {
            lang = routes[country];
        }
        else {
            lang = routes.default;
        }

        setCookie(langCookie, lang);
    }
    setHeader(langSettings.langHeader, lang);
    
    
    
    

    //===================================
    // Return response to the renderer
    // It'll handle it from here
    //===================================
    return response;
}

export const config = {
    // matcher solution for public, api, assets and _next exclusion
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };