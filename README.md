# GameHub

GameHub is a video game catalog web application built with Vanilla JavaScript. It uses the [RAWG Video Games Database API](https://rawg.io/apidocs) to browse and explore games.

> This repository currently contains only the project foundation (tooling, structure, and configuration). Application features are implemented in later tasks.

## Technologies

- Vite
- Vanilla JavaScript
- Lodash
- Handlebars
- REST API

## Installation

```
npm install
```

## Development

```
npm run dev
```

## Build

```
npm run build
```

## Preview production build

```
npm run preview
```

## Environment variables

This project requires a RAWG API key to communicate with the RAWG Video Games Database API.

1. Copy `.env.example` to `.env`.
2. Set your API key:

```
VITE_RAWG_API_KEY=your_api_key_here
```

The key is read at runtime via `import.meta.env.VITE_RAWG_API_KEY`. Never commit your real `.env` file.

## Deploy (GitHub Pages)

The production build is deployed automatically on every push to `master`.

Live site: https://staspytnik.github.io/GameHub/

### One-time GitHub setup

1. **Pages source.** Repo **Settings → Pages → Source**: GitHub Actions.
2. **Secrets.** Repo **Settings → Secrets and variables → Actions**, add the same keys as in `.env.example`:
   - `VITE_RAWG_API_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

You can also run the **Deploy to GitHub Pages** workflow manually from the Actions tab.
