This is a [Next.js](https://nextjs.org/) template created for super-powering Nitlix Apps quickly. It includes:
* Inter - A google font.
* Client theme provider, first rendered by the server (nitlix-themes)
* metaGen() - A function that generates meta tags for the page. (nitlix-metagen)
* FlameCSS, for quick flexboxes as well as a few other things.
* Quickstart global.scss
* SASS already installed.
* Tailwind ready to fly.
* Prebuilt I18N support (With @vercel/edge, via headers and context (nitlix-i18n))



## Cloning

To initialise this template, choose one of the following options:

### Option 1: Folder already exists

```bash
gh repo clone Nitlix/NitlixNextTemplate .
```

### Option 2: Folder does not exist

```bash
gh repo clone Nitlix/NitlixNextTemplate <folder-name>
# the folder name is optional
```

### Option 3: Forking

```bash
gh repo fork Nitlix/NitlixNextTemplate
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
