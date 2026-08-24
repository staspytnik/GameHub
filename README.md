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
