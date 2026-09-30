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
        id: 'cpp',
        name: 'C++',
        icon: 'code',
        description: '練演算法與資料結構的主要語言，用來寫解題程式與需要效能的小工具。',
      },
      {
        id: 'python',
        name: 'Python',
        icon: 'terminal',
        description: '寫 Bot、串接 API、處理資料與自動化腳本。',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: 'braces',
        description: '網頁互動與前端邏輯，包含這個作品集網站本身。',
      },
    ],
  },
  {
    id: 'web',
    label: 'Web 前端',
    items: [
      {
        id: 'html-css',
        name: 'HTML / CSS',
        icon: 'layout',
        description: '語意化標籤與響應式版面，重視可讀性、可維護性與無障礙。',
      },
      {
        id: 'react',
        name: 'React / Vite',
        icon: 'layers',
        description: '元件化 UI 開發與現代化前端建置流程。',
      },
      {
        id: 'git',
        name: 'Git / GitHub',
        icon: 'git',
        description: '版本控制、分支管理，以及用 GitHub Actions 自動部署。',
      },
    ],
  },
  {
    id: 'game',
    label: '遊戲開發',
    items: [
      {
        id: 'unity',
        name: 'Unity',
        icon: 'gamepad',
        description: '場景建立、元件操作與遊戲機制的實作流程。',
      },
      {
        id: 'csharp',
        name: 'C# / Game Logic',
        icon: 'cube',
        description: '物件行為、狀態切換與遊戲流程控制。',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI 與 Bot',
    items: [
      {
        id: 'llm',
        name: 'AI / LLM API',
        icon: 'sparkles',
        description: '把語言模型接進工具與服務，處理 prompt、回應解析與錯誤重試。',
      },
      {
        id: 'telegram',
        name: 'Telegram Bot',
        icon: 'send',
        description: 'Bot API、指令處理與訊息流程設計。',
      },
      {
        id: 'discord',
        name: 'Discord Bot',
        icon: 'message',
        description: '伺服器事件、斜線指令與權限處理。',
      },
      {
        id: 'image-model',
        name: 'Qwen / 影像模型',
        icon: 'image',
        description: '影像生成模型的應用實驗與成果整理。',
      },
    ],
  },
  {
    id: 'foundation',
    label: '電腦科學基礎',
    items: [
      {
        id: 'algorithms',
        name: 'Algorithms',
        icon: 'cpu',
        description: '複雜度分析、排序搜尋、圖論與動態規劃的實作練習。',
      },
      {
        id: 'apcs',
        name: 'APCS / 解題',
        icon: 'target',
        description: '以 APCS 題型與線上解題練習程式設計與演算法。',
      },
      {
        id: 'software',
        name: 'Software Development',
        icon: 'layers',
        description: '專案結構、模組拆分，以及把程式從「能跑」推進到「好用」。',
      },
    ],
  },
]

/** 給 SEO 結構化資料使用的技能名稱清單 */
export const skillNames = skillGroups.flatMap((group) => group.items.map((item) => item.name))
