import { NextResponse } from 'next/server'
import { geolocation } from '@vercel/edge';

import routes from "@/i18n/routes"
import translations from "@/i18n/translations"



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

        response.cookies.set('lang', lang);
    }
    response.headers.set('x-lang', lang);
     
    //===================================
    // Return response to the renderer
    // It'll handle it from here
    //===================================
    return response;
}