import { NextResponse } from 'next/server'

import { i18nInjector } from 'nitlix-i18n';
import { themeInjector } from 'nitlix-themes';
import themeSettings from "@/themes/settings"


export default function middleware(request) {
    // =================================
    // Create a response object
    // =================================
    let response = NextResponse.next({
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
    function setHeader(name, value){
        response.headers.set(name, value);
        request.headers.set(name, value);
    }

    //==================================================
    // Allow server components to access the URL
    //==================================================
    setHeader("x-url", request.url);

    
    //================================
    // Inject the theme cookies
    //================================
    response = themeInjector(request, themeSettings, response).response;
    

    //====================
    // Language setting
    //====================
    response = i18nInjector(request, {}, response).response;

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