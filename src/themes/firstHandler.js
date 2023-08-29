import settings from "./settings"

// ==================================================
// Here we will use the last used theme 
export default function(cookies){
    const lastTheme = cookies.get(settings.lastThemeCookie);
    const theme = cookies.get(settings.themeCookie);

    // ================================================
    // If the theme is not system, there is no need
    // to check the last theme.
    // ================================================
    if (theme.value != "system"){
        return {
            render: theme.value,
            use: theme.value
        }
    }

    // ================================================
    // Else we will use the last theme
    // So it won't flash when the user refreshes
    // with the same system interface.
    // ================================================
    if (!lastTheme.value || !settings.allowedStyles.includes(lastTheme.value)){
        // Use default theme
        // No history found
        return {
            render: theme.value,
            use: theme.value
        }
    }
    else {
        return {
            render: lastTheme.value,
            use: theme.value
        }
    }
}