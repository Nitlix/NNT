import settings from "@/themes/settings"

// ==================================================
// Here we will use the last used theme 
export default function(headers){
    const lastTheme = headers.get(settings.lastThemeHeader);
    const theme = headers.get(settings.themeHeader);

    // ================================================
    // If the theme is not system, there is no need
    // to check the last theme.
    // ================================================
    if (theme != "system"){
        return {
            render: theme,
            use: theme
        }
    }

    // ================================================
    // Else we will use the last theme
    // So it won't flash when the user refreshes
    // with the same system interface.
    // ================================================
    if (!lastTheme || !settings.allowedStyles.includes(lastTheme)){
        // Use default theme
        // No history found
        return {
            render: theme,
            use: theme
        }
    }
    else {
        return {
            render: lastTheme,
            use: theme
        }
    }
}