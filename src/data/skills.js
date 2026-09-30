/**
 * 技能設定檔
 *
 * 這裡只描述「會什麼、拿來做什麼」，不標示等級或百分比，
 * 避免出現沒有依據的自我評分。
 *
 * icon 可用的名稱請參考 src/components/Icon.jsx。
 */
export const skillGroups = [
  {
    id: 'languages',
    label: '程式語言',
    items: [
      {
        id: 'python',
        name: 'Python',
        icon: 'terminal',
        description: '主力語言，用來寫 Bot、串接 AI 模型 API、處理資料與自動化流程。',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: 'braces',
        description: '前端互動邏輯與 Node 端小工具，這個作品集網站也是用 JS 寫的。',
      },
      {
        id: 'cpp',
        name: 'C++',
        icon: 'code',
        description: '練習演算法與資料結構，用來寫解題程式與需要效能的練習。',
      },
    ],
  },
  {
    id: 'bots',
    label: 'Bot 開發',
    items: [
      {
        id: 'telegram-bot',
        name: 'Telegram Bot',
        icon: 'telegram',
        description: 'Bot API、指令與訊息處理，以及非同步的長任務流程設計。',
      },
      {
        id: 'discord-bot',
        name: 'Discord Bot',
        icon: 'discord',
        description: '事件監聽、指令處理、互動元件與權限設定。',
      },
      {
        id: 'tg-dc-sync',
        name: '雙平台同步',
        icon: 'layers',
        description: 'Telegram 與 Discord 共用同一套核心邏輯，並支援歷史訊息回填。',
      },
      {
        id: 'api-integration',
        name: '第三方 API 整合',
        icon: 'link',
        description: '串接外部服務，例如圖片服務與 Canva Connect API 的設計與匯出流程。',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI 與資料',
    items: [
      {
        id: 'llm',
        name: 'LLM API 整合',
        icon: 'sparkles',
        description: '以 DeepSeek API 為主要模型，處理多輪上下文、超長對話摘要與錯誤重試。',
      },
      {
        id: 'vision',
        name: '視覺模型 / 圖片理解',
        icon: 'image',
        description: '圖片壓縮後送交視覺模型，做 OCR、圖表數據與視覺重點分析。',
      },
      {
        id: 'rl',
        name: '強化學習',
        icon: 'target',
        description: '以模仿學習加上 PPO 微調訓練 Tetris AI，並自行設計難度控制。',
      },
      {
        id: 'datasets',
        name: '資料集與訓練流程',
        icon: 'cpu',
        description: '產生訓練資料、撰寫訓練腳本，以及評估模型表現與難度保真度。',
      },
    ],
  },
  {
    id: 'web',
    label: 'Web 前端',
    items: [
      {
        id: 'react',
        name: 'React / Vite',
        icon: 'layers',
        description: '元件化 UI 開發與現代化前端建置流程。',
      },
      {
        id: 'html-css',
        name: 'HTML / CSS',
        icon: 'layout',
        description: '響應式版面、CSS 設計變數與基本無障礙實作。',
      },
    ],
  },
  {
    id: 'tools',
    label: '開發工具',
    items: [
      {
        id: 'git',
        name: 'Git / GitHub',
        icon: 'git',
        description: '版本控制、分支管理與 GitHub 上的協作流程。',
      },
      {
        id: 'actions',
        name: 'GitHub Actions',
        icon: 'zap',
        description: 'push 之後自動建置並部署網站，不需要手動上傳檔案。',
      },
      {
        id: 'secrets',
        name: '環境變數與金鑰管理',
        icon: 'lock',
        description: 'API Key 與 Token 一律從環境變數讀取，不寫進程式碼或版控。',
      },
      {
        id: 'colab',
        name: 'Google Colab / Jupyter',
        icon: 'flask',
        description: '在雲端環境跑訓練與實驗，並用 Notebook 記錄實驗過程。',
      },
    ],
  },
]

/** 給 SEO 結構化資料使用的技能名稱清單 */
export const skillNames = skillGroups.flatMap((group) => group.items.map((item) => item.name))
