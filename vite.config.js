import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsDir = path.resolve(__dirname, 'src/html/sections');

// Build-time HTML includes: replaces `<!-- @include name -->` markers in
// index.html with the contents of `src/html/sections/name.html`, so each
// section stays in its own file without any runtime JS injection.
function htmlIncludes() {
  return {
    name: 'html-includes',
    transformIndexHtml(html) {
      return html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (match, name) => {
        const filePath = path.join(sectionsDir, `${name}.html`);
        if (!fs.existsSync(filePath)) {
          throw new Error(`[html-includes] Section not found: ${filePath}`);
        }
        return fs.readFileSync(filePath, 'utf-8').trim();
      });
    },
  };
}

// Project source lives in `src/`, static assets in `public/`,
// production build output goes to `dist/` at the project root.
export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [htmlIncludes()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'), library: path.resolve(__dirname, 'src/library.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});
