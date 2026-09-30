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
  /** 顯示在 Hero 主標、Navbar 與 SEO 標題：[YOUR_NAME] | Computer Science Student & Developer */
  name: '陳品璁',

  /** 中文姓名或暱稱（顯示在頁尾，可留空） */
  nameZh: '',

  /** 對外的職稱（英文，主要顯示） */
  roleEn: 'Student & Noob Developer',

  /** 對外的職稱（中文，次要顯示） */
  role: '學生 / 菜鳥開發者',

  /** Hero 下方的一句話自我介紹 */
  tagline: '我是一名正在學習資訊工程相關技術的學生，喜歡把想法做成真的能跑、能被使用的作品。',

  /** 大頭貼圖片路徑（放在 public/images/），可替換成自己的照片 */
  avatar: '1790790811747.jpg',
  avatarAlt: '個人照片',

  /** 主要 Email（會被組成 mailto: 連結） */
  email: 'wallacechen33@gmail.com',

  /** 所在地，未填寫時網站會自動隱藏這一項 */
  location: '台灣',

  /** Hero 下方與 About 使用的關注領域標籤 */
  focusAreas: ['程式設計', 'AI / LLM 應用', '遊戲開發', 'Bot 開發', '演算法', '軟體開發'],

  /** Hero 右上角的程式碼卡片（純裝飾，內容可自由修改） */
  codeCard: {
    filename: 'about-me.js',
    variable: 'student',
    lines: [
      { key: 'name', value: "'[YOUR_NAME]'" },
      { key: 'role', value: "'CS Student & Developer'" },
      { key: 'focus', value: "['AI', 'Game', 'Bots']" },
      { key: 'status', value: "'building things that work'" },
    ],
  },

  /** About Me 區塊 */
  about: {
    intro: '正在學習資訊工程相關技術，持續把學到的東西變成實際能執行的專案。',
    paragraphs: [
      '我是一名正在學習資訊工程相關技術的學生。從 C++ 與演算法開始打底，慢慢延伸到 Python、Web 前端與 Unity 遊戲開發，目前大部分時間都花在把學到的東西做成實際的專案。',
      '最有興趣的方向是 AI / LLM 應用：把模型 API 接進真的有人會用的工具與 Bot 裡，處理指令流程、錯誤重試，以及實際使用時才會遇到的問題。',
      '我相信作品要能被使用才算完成，所以每個專案都會盡量做到可以跑、可以展示、可以讓別人直接操作。',
    ],
    /** About 區塊右側的快速資訊，value 可以自由修改 */
    facts: [
      { id: 'status', label: '目前身份', value: '學生' },
      { id: 'languages', label: '主要語言', value: 'C++ / Python / JavaScript / zh-TW' },
      { id: 'focus', label: '關注領域', value: 'AI / LLM、Unity、Bot' },
      { id: 'location', label: '所在地', value: '台灣' },
    ],
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
      href: 'https://github.com/[YOUR_GITHUB]',
      handle: '@[YOUR_GITHUB]',
      description: '所有專案原始碼與練習紀錄',
      enabled: true,
      primary: true,
    },
    {
      id: 'email',
      label: 'Email',
      icon: 'mail',
      href: 'mailto:[YOUR_EMAIL]',
      handle: '[YOUR_EMAIL]',
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

/** Navbar 顯示用的縮寫：優先用 name 的英文字首，其次是 </> */
export function getInitials(name = profile.name) {
  if (/\[|\]/.test(name)) return '</>'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '</>'
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
