/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#FFF",
                    dark: "#FFF",
                    light: "#000",
                },
                secondary: {
                    DEFAULT: "FFFFFFb2",
                    dark: "#FFFFFFb2",
                    light: "#000000b2",
                },
            },
        },
    },
    plugins: [],
    darkMode: ["class", "[data-theme='dark']"],
};
