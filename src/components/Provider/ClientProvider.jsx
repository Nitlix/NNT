"use client";
import { useEffect } from "react";
import MAIN from "@/var/main"

const allowed_themes = ["dark", "light", "system"]
const default_theme = "dark";
function check(){
    const theme = localStorage.getItem("theme");
    if (allowed_themes.includes(theme)){
        if (theme === "system"){
            //check system theme
            const system_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            if (system_theme === "dark"){
                return "dark";
            }
            return "light";
        }

        return theme;
    }
    else {
        localStorage.setItem("theme", default_theme);
        return default_theme;
    }
}


function applyTheme(){
    const body = document.querySelector("body");

    const theme = check();
    body.classList.remove("dark", "light");
    body.classList.add(theme);
    localStorage.setItem("theme", theme);
    //add it to cookies so the server can read it too
    document.cookie = `theme=${theme};path=/;max-age=31536000`;
}


export default function({children, className=""}){
    //inject theme based on localhost parameter
    useEffect(()=>{
        applyTheme();
    },[])

    return <body className={`${className}`}>
        <main className={MAIN}>
            {children}
        </main>
    </body>
}