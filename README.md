<p align="center">
    <img src="https://static.nitlix.pro/github/nnt_new.png" align="center" />
</p>

## The #1 Next.JS Template 💖 - Star for a cookie 🍪

This is a [Next.js](https://nextjs.org/) template created for scaffolding web apps for production in a click. It includes:

-   Geist font.
-   Theme provider by next-themes
-   Lenis built-in and an optimised version of AOS. (nitlix-aos)
-   A Navigation manager and provider (for page transitions) with AutoScroll via Lenis.
-   Metagen - A function to be exported/used that generates meta tags for the page on the fly. (nitlix-metagen)
-   Quickstart global.scss and animations.scss
-   SASS already installed, tailwind ready to fly.
-   4 Fonts to start with: Neue Montreal, Neutral Grotesk, Inter and Strretch Sans.
-   Prisma ready to launch! (Just create the .env vars)
-   Prebuilt I18N support via automatic management in the middleware.

## Quickstarting using create-napp

```bash
# First install the create-napp package globally
npm i create-napp@latest -g
```

then run the create-napp command to initialise this template.

```bash
create-napp
```

You'll be prompted with this:

```bash
? Setup the project in...? »
# Use "." or "./" for the local folder.
# Use a foldername to setup the project in that folder. (It will be created if it doesn't exist
```

## Cloning

To initialise this template, choose one of the following options:

### Option 1: Folder already exists

```bash
gh repo clone Nitlix/NNT .
```

### Option 2: Folder does not exist

```bash
gh repo clone Nitlix/NNT <folder-name>
# the folder name is optional
```

### Option 3: Forking

```bash
gh repo fork Nitlix/NNT
```

## Getting Started

Firstly install the dependencies:

```bash
npm i
# or
yarn
# or
pnpm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
