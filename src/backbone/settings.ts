export default {
    allowedThemes: ['dark'], // Also 'system' and 'light' are allowed
    defaultTheme: 'dark', // Same here

    allowedStyles: ['dark'], // Also 'light' is allowed (Used for last renders)
    defaultStyle: 'dark', // Same here; this should be the same as the default theme

    themeCookie: 'theme',
    lastThemeCookie: 'last-theme',
    
    lastThemeHeaderSignal: 'x-last-theme',
    themeHeaderSignal: 'x-theme-signal',
}