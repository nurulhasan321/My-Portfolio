# Nurul Hasan — Portfolio

A static, responsive portfolio built with React, Vite, and plain CSS. All editable portfolio copy and content lives in `src/data.js`.

## Folder structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── Nurul_Hasan_cv.pdf
│   ├── nurul-hasan.jpg
│   └── README.md
└── src/
    ├── data.js
    ├── main.jsx
    └── styles.css
```

## Install and run

```bash
npm install
npm run dev
```

Vite prints a local URL to open in your browser. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Add the CV

The supplied CV is included at `public/Nurul_Hasan_cv.pdf`, and the supplied portrait is at `public/nurul-hasan.jpg`. The hero's Download CV link points to `/Nurul_Hasan_cv.pdf`; Vite serves files in `public/` from the site root. Replace those files if you update them.

Project repository buttons are disabled placeholders because project repository URLs were not provided. Add verified URLs in `src/data.js` if you want to link them.

## Deploy

- **Vercel:** Import the project repository. Use `npm run build` as the build command and `dist` as the output directory.
- **Netlify:** Import the repository. Use `npm run build` as the build command and `dist` as the publish directory.
- **GitHub Pages:** Set the Vite `base` in `vite.config.js` to `'/<repository-name>/'`, then publish the `dist` folder with GitHub Pages (for example, using the official Pages deployment workflow). For a user or organization site repository, keep the base as `/`.

The theme toggle saves the user's choice in local storage. The site uses no backend or external APIs.
