"use client";
import { NavigationContext } from "@/backbone/Backbone";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function ({
    children,
    href,
    ...props
}: React.JSX.IntrinsicElements["a"] & { href: string }) {
    const { navigate } = useContext(NavigationContext);

    const router = useRouter();

    useEffect(() => {
        router.prefetch(href);
    }, []);

    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                navigate(href, true);
            }}
            {...props}
        >
            {children}
        </a>
    );
}
