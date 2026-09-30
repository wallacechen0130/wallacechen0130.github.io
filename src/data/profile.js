/**
 * 個人資料設定檔
 *
 * 網站上所有「關於你」的內容都集中在這個檔案裡。
 * 修改這裡不需要動到任何 UI 程式碼，畫面會自動跟著更新。
 *
 * 尚未填寫的欄位請保留 [YOUR_XXX] 這種 placeholder 格式：
 * 網站會自動偵測 placeholder，把它顯示成「未設定」狀態，
 * 避免部署後出現連到不存在帳號的壞連結。
 */
export const profile = {
  /** 顯示在 Hero 主標、Navbar 與 SEO 標題：陳品璁 | Student & Noob Developer */
  name: '陳品璁',

  /** 中文姓名或暱稱（顯示在頁尾；留空時顯示 name） */
  nameZh: '',

  /** 對外的職稱（英文，主要顯示） */
  roleEn: 'Student & Noob Developer',

  /** 對外的職稱（中文，次要顯示） */
  role: '學生 / 菜鳥開發者',

  /** Hero 下方的一句話自我介紹 */
  tagline: '用 Python 寫 Bot 與 AI 應用，把學到的東西做成真的能跑的服務。',

  /** 大頭貼圖片路徑（放在 public/images/），可替換成自己的照片 */
  avatar: 'images/avatar.jpg',
  avatarAlt: '陳品璁的照片',

  /** 主要 Email（會被組成 mailto: 連結） */
  email: 'wallacechen33@gmail.com',

  /** 所在地，未填寫時網站會自動隱藏這一項 */
  location: '台灣',

  /** Hero 下方與 About 使用的關注領域標籤 */
  focusAreas: [
    'Python Bot 開發',
    'AI / LLM 應用',
    '遊戲開發',
    'Bot 開發',
    '演算法',
    'Web 前端',
  ],

  /** Hero 右上角的程式碼卡片（純裝飾，內容可自由修改） */
  codeCard: {
    filename: 'about-me.js',
    variable: 'me',
    lines: [
      { key: 'name', value: "'陳品璁'" },
      { key: 'role', value: "'Student & Developer'" },
      { key: 'focus', value: "['AI', 'Bots', 'RL']" },
      { key: 'building', value: "'Telegram AI assistants'" },
    ],
  },

  /** About Me 區塊 */
  about: {
    intro: '用 Python 寫 Bot 與 AI 應用，把學到的東西做成真的能跑的服務。',
    paragraphs: [
      '我是一名正在學習資訊工程相關技術的學生，主要的開發語言是 Python。大部分時間都花在 Bot 開發上，從 Telegram 與 Discord 的訊息處理、指令設計，到第三方 API 整合與非同步架構，一步步把想法做成真的能跑的服務。',
      '最近投入最多的是 AI 應用：把 LLM 與視覺模型接進 Bot 裡，做成能聊天、看得懂圖片、甚至能產生報告與簡報的助理；另外也做了一個 TETR.IO 風格的 Tetris AI，從自建規則引擎、啟發式教師，到模仿學習與 PPO 微調都是自己實作的。',
      '除了 Bot，我也用 React + Vite 寫前端。這個作品集網站是自己設計、自己刻的，並透過 GitHub Actions 自動部署到 GitHub Pages。',
    ],
    /** About 區塊右側的快速資訊，value 可以自由修改 */
    facts: [
      { id: 'status', label: '目前身份', value: '學生' },
      { id: 'languages', label: '主要語言', value: 'C++ / Python / JavaScript' },
      { id: 'focus', label: '關注領域', value: 'AI / LLM、Unity、Bot' },
      { id: 'location', label: '所在地', value: '台灣' },
    ],
  },

  /** Contact 區塊的文案 */
  contact: {
    heading: '一起做點東西',
    text: '目前持續在做 Bot 與 AI 應用，對 LLM 整合、強化學習與前端開發都很有興趣。有想法、合作機會或實習資訊都歡迎寄信給我。',
  },

  /**
   * 對外連結。enabled: false 的項目不會出現在網站上。
   * 填入真實資料後，把 enabled 改成 true 即可顯示。
   */
  links: [
    {
      id: 'github',
      label: 'GitHub',
      icon: 'github',
      href: 'https://github.com/wallacechen0130',
      handle: '@wallacechen0130',
      description: '所有 Bot、AI 與前端專案的原始碼',
      enabled: true,
      primary: true,
    },
    {
      id: 'email',
      label: 'Email',
      icon: 'mail',
      href: 'mailto:wallacechen33@gmail.com',
      handle: 'wallacechen33@gmail.com',
      description: '合作、實習或任何問題都歡迎來信',
      enabled: true,
      primary: true,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      icon: 'telegram',
      href: '[YOUR_TELEGRAM_URL]',
      handle: '@[YOUR_TELEGRAM]',
      description: '填入帳號或連結後，把 enabled 改成 true',
      enabled: false,
      primary: false,
    },
    {
      id: 'discord',
      label: 'Discord',
      icon: 'discord',
      href: '[YOUR_DISCORD_URL]',
      handle: '[YOUR_DISCORD]',
      description: '填入帳號或連結後，把 enabled 改成 true',
      enabled: false,
      primary: false,
    },
  ],
}

/** 只回傳有開啟的連結 */
export const activeLinks = profile.links.filter((link) => link.enabled)

/** 取得指定 id 的連結（找不到時回傳 undefined） */
export function getLink(id) {
  return activeLinks.find((link) => link.id === id)
}

/** Navbar 顯示用的縮寫：英文名字取字首，中文名字取第一個字 */
export function getInitials(name = profile.name) {
  if (/\[|\]/.test(name)) return '</>'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '</>'
  // 中文名字只有一段時取第一個字（例如「陳品璁」→「陳」）
  if (parts.length === 1 && !/^[\x20-\x7E]+$/.test(parts[0])) return parts[0].slice(0, 1)
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
