import { NextResponse } from 'next/server'
import { geolocation } from '@vercel/edge';

import routes from "@/i18n/routes"
import translations from "@/i18n/translations"

import themeSettings from "@/themes/settings"




export default function middleware(request) {
    //==================================================
    // Allow server components to access the URL
    //==================================================
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);


    
    //==========================
    // Create response object
    //==========================
    const response = NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    });



    //====================
    // Language setting
    //====================
    let lang = request.cookies.get('lang');
    if (lang){
        lang = lang.value.toLowerCase();
    }

    if(!translations[lang]) {
        const { country } = geolocation(request);
        if (routes[country]) {
            lang = routes[country];
        } else {
            lang = routes.default;
        }

        request.cookies.set('lang', lang);
    }
    request.headers.set('x-lang', lang);



    //====================
    // Theme setting
    //====================
    let theme = request.cookies.get('theme');
    if (theme) {
        theme = theme.value.toLowerCase();
    }

    if (!themeSettings.allowed.includes(theme)) {
        console.log('Theme not allowed');
        request.cookies.set('theme', themeSettings.default);
    }







    //===================================
    // Return response to the renderer
    // It'll handle it from here
    //===================================
    return NextResponse.next({
        request: {
            // Apply new request headers
            headers: request.headers,
            // Apply new request cookies
            cookies: request.cookies,
        }
    });
}

export const config = {
    // matcher solution for public, api, assets and _next exclusion
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };