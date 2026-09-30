/**
 * 專案設定檔
 *
 * 新增專案：複製一個物件、改掉 id，再把圖片放到 public/images/projects/ 即可。
 * UI（篩選按鈕、卡片、欄位）會自動跟著資料變動，不需要改任何元件。
 *
 * featured: true 會讓卡片在桌面版佔兩欄，適合標記「主打專案」。
 * 建議只設定一個，連續兩張 featured 卡片會在 3 欄版面留下空隙。
 *
 * links.repo 填 null 表示程式碼未公開，卡片會顯示「程式碼未公開」而不是壞連結；
 * 還沒填時請保留 [PROJECT_URL]，網站會顯示成「未設定」。
 */
export const projects = [
  {
    id: 'telegram-deepseek-ai-bot',
    title: 'Telegram DeepSeek AI Bot',
    category: 'AI',
    featured: true,
    summary:
      '可以直接在 Telegram 裡使用的 AI 助理：聊天、寫程式、看圖片、做報告、做簡報。後端以 DeepSeek API 為主要模型，採模組化 async 架構。',
    highlights: [
      '多輪對話記憶，超出上下文預算時自動摘要',
      '圖片理解：OCR、圖表數據與視覺重點分析',
      '報告與簡報逐頁產生，並整合 Canva Connect API 匯出 PPTX',
      '長任務進度原地更新，長訊息自動分段不切斷 Markdown',
    ],
    technologies: ['Python', 'DeepSeek API', 'Telegram Bot API', 'Canva Connect API', 'asyncio'],
    image: 'images/projects/deepseek-ai-bot.svg',
    imageAlt: 'Telegram DeepSeek AI Bot 專案示意圖',
    links: { repo: null, demo: null },
  },
  {
    id: 'tetrio-tetris-ai',
    title: 'TETR.IO 風格 Tetris AI',
    category: 'AI',
    summary:
      '以「職業玩家風格」為目標的 Tetris AI：自建 TETR.IO 風格規則引擎、啟發式教師、模仿學習與 PPO 微調，並內建七級強度控制（PPS / APM / 反應時間 / 失誤 / 打法風格）。',
    highlights: [
      '自建規則引擎與七級難度保真度評估',
      '啟發式教師 → 資料集 → 模仿學習 → PPO 微調的完整流程',
      '支援 ONNX 匯出與 Google Drive 訓練資料同步',
    ],
    technologies: ['Python', 'Reinforcement Learning', 'PPO', 'Imitation Learning', 'Jupyter'],
    image: 'images/projects/tetrio-tetris-ai.png',
    imageAlt: 'TETR.IO 風格 Tetris AI 專案預覽圖',
    links: { repo: 'https://github.com/wallacechen0130/tetr_bot', demo: null },
  },
  {
    id: 'telegram-discord-bot',
    title: 'Telegram / Discord 圖片 Bot',
    category: 'Bot',
    summary:
      '在 Telegram 與 Discord 上同時運作的 Bot，共用同一套核心邏輯，包含圖片儲存、指令處理與第三方 API 整合。',
    highlights: [
      '兩個平台共用核心，指令與事件各自處理',
      '圖片儲存與管理機制',
      '第三方 API 整合與互動元件',
    ],
    technologies: ['Python', 'Telegram Bot API', 'Discord API'],
    image: 'images/projects/telegram-discord-bot.png',
    imageAlt: 'Telegram / Discord Bot 專案預覽圖',
    links: { repo: 'https://github.com/wallacechen0130/n_bot', demo: null },
  },
  {
    id: 'tg-dc-sync-bot',
    title: 'Telegram ↔ Discord 訊息同步 Bot',
    category: 'Bot',
    summary:
      '把 Telegram 與 Discord 兩邊的訊息互相同步的 Bot，並支援歷史訊息回填，讓兩邊的對話維持在同一條時間線上。',
    highlights: [
      '雙向訊息轉發',
      '歷史訊息回填（backfill）',
      '同時管理兩個平台的 Bot 生命週期',
    ],
    technologies: ['Python', 'Telegram Bot API', 'Discord API', 'asyncio'],
    image: 'images/projects/tg-dc-sync-bot.png',
    imageAlt: 'Telegram 與 Discord 訊息同步 Bot 專案預覽圖',
    links: { repo: 'https://github.com/wallacechen0130/tg-dc-bot', demo: null },
  },
  {
    id: 'discord-image-bot',
    title: 'Discord Image Bot',
    category: 'Bot',
    summary:
      'Discord 隨機圖片 Bot：用指令從一般圖片池與大獎池抽圖，機率依圖片數量自動計算，支援多種圖片格式。',
    highlights: [
      '一般池與大獎池的分池抽獎機制',
      '大獎機率依一般圖片數量自動計算',
      '支援 png / jpg / jpeg / gif / webp',
    ],
    technologies: ['Python', 'Discord API'],
    image: 'images/projects/discord-image-bot.svg',
    imageAlt: 'Discord Image Bot 專案示意圖',
    links: { repo: 'https://github.com/wallacechen0130/-BOT', demo: null },
  },
]

/** 篩選按鈕清單：All + 所有出現過的 category */
export const projectFilters = ['All', ...new Set(projects.map((project) => project.category))]
