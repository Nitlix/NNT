import ThemeSwitcher from "@/components/ThemeSwitcher";

const pageTranslations = {
    en: {
        welcome: (
            <>
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-500 to-red-500 dark:from-orange-500 dark:to-pink-500 text-transparent bg-clip-text">
                    NNT V2.
                </span>
            </>
        ),
        more: "Nothing to see here!",
    },
    de: {
        welcome: (
            <>
                Willkommen bei{" "}
                <span className="bg-gradient-to-r from-blue-500 to-red-500 dark:from-orange-500 dark:to-pink-500 text-transparent bg-clip-text">
                    NNT V2.
                </span>
            </>
        ),
        more: "Nichts zu sehen hier!",
    },
};

export default async function ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = (await params) as {
        locale: keyof typeof pageTranslations;
    };

    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center gap-[1rem]">
                <h3
                    className="text-[3rem]"
                    data-np-action="horizontal"
                    data-np-offset="400"
                    data-np-speed="-1"
                >
                    {pageTranslations[locale].welcome}
                </h3>
                <ThemeSwitcher />
            </div>

            <h3 className="text-[3rem] w-full !max-w-none h-[100vh] flex justify-center items-center">
                {pageTranslations[locale].more}
            </h3>
        </>
    );
}
