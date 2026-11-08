import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site.config.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Every generated static page (blog, articles, legal) is its own Vite entry.
function htmlEntries(dir: string, out: Record<string, string> = {}) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) htmlEntries(p, out)
    else if (name === 'index.html') out[p.replace(__dirname + '/', '').replace(/\/index\.html$/, '') || 'main'] = p
  }
  return out
}

const pageDirs = ['blog', 'privacy', 'terms', 'accessibility']

// Lets index.html use __SITE_URL__ for canonical/OG/JSON-LD URLs.
const siteUrl = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
})

export default defineConfig({
  plugins: [react(), siteUrl()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...pageDirs.reduce((acc, d) => ({ ...acc, ...htmlEntries(resolve(__dirname, d)) }), {}),
      },
    },
  },
})
