/**
 * 作品集設定檔（學校報告、研究、實驗與其他文件）
 *
 * 目前放的是「已經有實際內容」的項目（Tetris AI 的設計文件與實驗、
 * GitHub 專案總覽）。School Projects 與 Reports 還沒有資料，
 * 之後把項目補進來就會自動出現，不需要改任何程式碼。
 *
 * type 可用的值：'github' | 'pdf' | 'image' | 'report' | 'research' | 'experiment' | 'link'
 */
export const portfolioCategories = [
  'All',
  'School Projects',
  'Reports',
  'Research',
  'Experiments',
  'Computer Science Portfolio',
]

/** 每一種類型的顯示圖示與標籤 */
export const portfolioTypes = {
  github: { icon: 'github', label: 'GitHub' },
  pdf: { icon: 'file', label: 'PDF' },
  image: { icon: 'image', label: '圖片' },
  report: { icon: 'book', label: '報告' },
  research: { icon: 'search', label: '研究' },
  experiment: { icon: 'flask', label: '實驗' },
  link: { icon: 'link', label: '連結' },
}

export const portfolioItems = [
  {
    id: 'tetris-ai-design-doc',
    title: 'TETR.IO 風格 Tetris AI 設計文件',
    category: 'Research',
    type: 'research',
    description:
      '從自建規則引擎、啟發式教師，到模仿學習與 PPO 微調的完整設計文件，包含七級難度控制的定義與訓練流程說明。',
    tags: ['Python', 'Reinforcement Learning', 'PPO'],
    date: null,
    url: 'https://github.com/wallacechen0130/tetr_bot/tree/main/docs',
  },
  {
    id: 'tetris-ai-experiment',
    title: 'Tetris AI 訓練與難度保真度實驗',
    category: 'Experiments',
    type: 'experiment',
    description:
      '用自建環境產生訓練資料、訓練模仿學習模型，再以 PPO 微調，最後用難度保真度報表檢查 AI 打起來像不像對應等級的玩家。',
    tags: ['Imitation Learning', 'PPO', 'Jupyter'],
    date: null,
    url: 'https://github.com/wallacechen0130/tetr_bot',
  },
  {
    id: 'telegram-ai-bot',
    title: 'Telegram AI 助理（Bot + LLM 應用）',
    category: 'Experiments',
    type: 'experiment',
    description:
      '把 LLM 與視覺模型接進 Telegram 的實驗專案：模組化 async 架構、長任務進度更新，以及報告／簡報的自動產生流程。',
    tags: ['Python', 'DeepSeek API', 'LLM'],
    date: null,
    url: null,
  },
  {
    id: 'csv-portfolio-github',
    title: 'GitHub 專案總覽',
    category: 'Computer Science Portfolio',
    type: 'github',
    description: '所有 Bot、AI 與前端專案的原始碼都在 GitHub 上，包含這個作品集網站本身。',
    tags: ['Open Source', 'GitHub'],
    date: null,
    url: 'https://github.com/wallacechen0130?tab=repositories',
  },
]
