"use client";

import "./Aos.css";
import Aos from "locomotive-aos";
import { useEffect } from "react";

export default function () {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: "ease-in-out",
        });
    }, []);
    return <></>;
}
