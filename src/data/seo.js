/**
 * SEO / 網站層級設定
 *
 * 部署前請把 url 改成你的實際網址，例如：
 *   https://your-name.github.io            （使用者網站）
 *   https://your-name.github.io/portfolio  （專案網站，帶 repo 名稱）
 *
 * 結尾不要加斜線。GitHub Actions 會用 VITE_SITE_URL 覆蓋這個值，
 * 所以平常不需要手動改，只有在本機建置時才會用到這裡的設定。
 */
export const seo = {
  url: 'https://USERNAME.github.io',
  locale: 'zh_TW',
  themeColor: '#0F4C81',
  description:
    '[YOUR_NAME] 的個人作品集網站 — 資訊工程學生，專注於程式設計、AI / LLM 應用、Unity 遊戲開發、Bot 開發與演算法。',
  keywords: [
    'portfolio',
    '作品集',
    'computer science',
    '資訊工程',
    'developer',
    'front-end',
    'C++',
    'Python',
    'Unity',
    'AI',
    'LLM',
    'Telegram Bot',
    'Discord Bot',
    'algorithms',
  ],
  /** 社群分享預覽圖，建議之後換成 public/images/og-image.png（1200×630）再改這裡的檔名 */
  ogImage: 'images/og-image.svg',
  twitterCard: 'summary_large_image',
}
