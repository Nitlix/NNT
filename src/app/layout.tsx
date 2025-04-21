// =====================
// Global CSS Imports
// =====================
import "./globals.scss";
import "./animations.scss";

// =====================
// Theme CSS Imports
// =====================
import "@/backbone/themes.scss";

// =====================
// Google Font (Inter)
// =====================
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

// =====================
// Geist Font (By Vercel)
// =====================
import { GeistSans } from "geist/font/sans";

// =====================
// Custom Font (Neue Montreal)
// =====================
// import NeueMontreal from "@/fonts/NeueMontreal/NeueMontreal";

// =====================
// Metadata Export
// =====================
import { metaGen, setDefaults } from "nitlix-metagen";
setDefaults({
    title: "Nitlix Prebuilt App",
    description:
        "This is the default description for the NNT Next.JS template. Feel free to change it.",
});
export const metadata = metaGen();

// =====================
// Theme Provider
// =====================
import { themeRetriever } from "nitlix-themes";
import Backbone from "@/backbone/Backbone";
import { themeConfig } from "@/backbone/configs";
import Aos from "@/lib/Aos/Aos";

// =====================
// Layout Export
// =====================
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </head>
            <Backbone
                className={GeistSans.className}
                themeRetriever={await themeRetriever(themeConfig)}
            >
                {/* Feel free to remove the code below if you don't wish to use AOS */}
                <Aos />

                <main className="_nitlix" data-scroll-container>
                    {children}
                </main>
            </Backbone>
        </html>
    );
}
