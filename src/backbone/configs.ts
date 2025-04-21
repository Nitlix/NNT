import { Config } from "nitlix-themes";

export const themeConfig: Config = {
    allowedThemes: ["dark", "light", "system"], // Also 'system' and 'light' are allowed
    defaultTheme: "dark", // Same here

    allowedStyles: ["dark", "light"], // Also 'light' is allowed (Used for last renders)
    defaultStyle: "dark", // Same here; this should be the same as the default theme
};
