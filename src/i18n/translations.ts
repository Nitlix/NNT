// ====================================
// Allowed languages and translations
// ====================================

export type Translation = {
    [key: string]: string | Translation
}

export type Translations = {
    [key: string]: Translation
}

export default {
    "en": {
        "welcome": "Welcome."
    },
    "de": {
        "welcome": "Willkommen."
    }
}