import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seo } from './src/data/seo.js'

const rootDir = dirname(fileURLToPath(import.meta.url))

// 內容資料都放在 JSON 檔（後台可直接讀寫），這裡用 fs 讀取，
// 避免在 Node 端載入前端模組。
function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(rootDir, relativePath), 'utf8'))
}

const profile = readJson('src/data/profile.json')
const skillNames = readJson('src/data/skills.json').skillGroups.flatMap((group) =>
  group.items.map((item) => item.name),
)

/**
 * GitHub Pages 的 base path。
 *
 * - 使用者網站（repo 名稱是 <username>.github.io）：'/'，由 workflow 自動判斷。
 * - 專案網站（例如 repo 名稱 portfolio）：'/portfolio/'，同樣由 workflow 自動判斷。
 * - 本機開發：預設 '/'。
 *
 * 也可以在 .env 或指令前設定 VITE_BASE 覆蓋，例如 VITE_BASE=/portfolio/ npm run build。
 */
function normalizeBase(value) {
  if (!value || value === '/') return '/'
  return `/${value.replace(/^\/+|\/+$/g, '')}/`
}

const base = normalizeBase(process.env.VITE_BASE)
const siteUrl = (process.env.VITE_SITE_URL || seo.url).replace(/\/+$/, '')
const siteTitle = `${profile.name} | ${profile.roleEn}`

/** 只有在資料不是 placeholder 時才輸出，避免產生無效的結構化資料。 */
function jsonOrNull(value) {
  if (!value || /\[(YOUR|PROJECT)_[A-Z_]+\]/.test(value)) return null
  return value
}

function structuredData() {
  const github = jsonOrNull(profile.links.find((link) => link.id === 'github')?.href)
  const email = jsonOrNull(profile.email)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.roleEn,
    description: seo.description,
    url: `${siteUrl}${base}`,
    knowsAbout: skillNames,
    ...(github ? { sameAs: [github] } : {}),
    ...(email ? { email: `mailto:${email}` } : {}),
  }

  return JSON.stringify(data, null, 2)
}

function buildHtmlTokens() {
  return {
    '%SITE_TITLE%': siteTitle,
    '%SITE_DESCRIPTION%': seo.description,
    '%SITE_KEYWORDS%': seo.keywords.join(', '),
    '%SITE_AUTHOR%': profile.name,
    '%SITE_URL%': `${siteUrl}${base}`,
    '%SITE_LOCALE%': seo.locale,
    '%THEME_COLOR%': seo.themeColor,
    '%OG_IMAGE%': `${siteUrl}${base}${seo.ogImage}`,
    '%TWITTER_CARD%': seo.twitterCard,
    '%STRUCTURED_DATA%': structuredData(),
  }
}

/**
 * 產生 GitHub Pages 需要的靜態檔案：
 * robots.txt / sitemap.xml / 404.html / .nojekyll。
 * 這些檔案會跟著 base path 與網址設定自動更新，不需要手動維護。
 */
function seoFilesPlugin() {
  return {
    name: 'portfolio-seo-files',
    apply: 'build',
    transformIndexHtml(html) {
      return Object.entries(buildHtmlTokens()).reduce(
        (output, [token, value]) => output.replaceAll(token, value),
        html,
      )
    },
    closeBundle() {
      const outDir = resolve(rootDir, 'dist')
      mkdirSync(outDir, { recursive: true })

      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}${base}sitemap.xml\n`,
        'utf8',
      )

      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n` +
          `    <loc>${siteUrl}${base}</loc>\n` +
          `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n` +
          `    <changefreq>monthly</changefreq>\n` +
          `    <priority>1.0</priority>\n` +
          `  </url>\n` +
          `</urlset>\n`,
        'utf8',
      )

      // 單頁網站：任何不存在的路徑都導回首頁，避免 GitHub Pages 顯示 404。
      writeFileSync(
        resolve(outDir, '404.html'),
        `<!doctype html>\n<html lang="zh-Hant">\n  <head>\n    <meta charset="utf-8" />\n` +
          `    <title>404 — ${siteTitle}</title>\n` +
          `    <meta name="robots" content="noindex" />\n` +
          `    <script>location.replace(${JSON.stringify(base)} + location.search + location.hash);</script>\n` +
          `  </head>\n  <body>\n    <p><a href="${base}">回到首頁</a></p>\n  </body>\n</html>\n`,
        'utf8',
      )

      // 告訴 GitHub Pages 不要用 Jekyll 處理產物。
      writeFileSync(resolve(outDir, '.nojekyll'), '', 'utf8')
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seoFilesPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
})
