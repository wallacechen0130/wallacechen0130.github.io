/**
 * 專案設定檔
 *
 * 新增專案：複製一個物件、改掉 id，再把圖片放到 public/images/projects/ 即可。
 * UI（篩選按鈕、卡片、欄位）會自動跟著資料變動，不需要改任何元件。
 *
 * featured: true 會讓卡片在桌面版佔兩欄，適合標記「主打專案」。
 * 建議只設定一個，連續兩張 featured 卡片會在 3 欄版面留下空隙。
 *
 * links.repo / links.demo 還沒填時請保留 [PROJECT_URL]，
 * 網站會把它顯示成「未設定」而不是壞連結。
 */
export const projects = [
  {
    id: 'telegram-discord-bot',
    title: 'Telegram / Discord Bot',
    category: 'Bot',
    featured: true,
    summary:
      '在 Telegram 與 Discord 上運作的聊天機器人，串接 LLM API 產生回應，並處理指令解析、權限與錯誤重試。',
    highlights: [
      '統一的指令處理流程，兩個平台共用同一套核心邏輯',
      '串接 LLM API，處理非同步回應與失敗重試',
      '訊息長度、速率限制與例外狀況的處理',
    ],
    technologies: ['Python', 'Telegram Bot API', 'Discord API', 'LLM API'],
    image: 'images/projects/telegram-discord-bot.svg',
    imageAlt: 'Telegram / Discord Bot 專案示意圖',
    links: { repo: '[PROJECT_URL]', demo: null },
  },
  {
    id: 'unity-game',
    title: 'Unity Game',
    category: 'Game',
    featured: false,
    summary: '使用 Unity 開發的 2D / 3D 遊戲專案，包含場景建置、C# 腳本與遊戲機制實作。',
    highlights: ['場景與關卡建置', 'C# 腳本控制物件行為', '遊戲流程與狀態切換'],
    technologies: ['Unity', 'C#', 'Game Design'],
    image: 'images/projects/unity-game.svg',
    imageAlt: 'Unity 遊戲專案示意圖',
    links: { repo: '[PROJECT_URL]', demo: null },
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    category: 'AI',
    summary: '以 LLM 為核心的助理工具，把模型接進實際的使用流程，而不只是單次的問答。',
    highlights: ['prompt 與上下文組裝', '回應格式解析與錯誤處理', '依需求調整模型參數'],
    technologies: ['Python', 'LLM API', 'Prompt Engineering'],
    image: 'images/projects/ai-assistant.svg',
    imageAlt: 'AI Assistant 專案示意圖',
    links: { repo: '[PROJECT_URL]', demo: null },
  },
  {
    id: 'qwen-image-project',
    title: 'Qwen Image Project',
    category: 'AI',
    summary: '使用 Qwen 影像生成模型的實驗專案，測試不同提示詞與參數對成品的影響。',
    highlights: ['提示詞實驗與結果比較', '生成流程自動化', '成品整理與展示'],
    technologies: ['Qwen', 'Python', 'Image Generation'],
    image: 'images/projects/qwen-image.svg',
    imageAlt: 'Qwen Image Project 專案示意圖',
    links: { repo: '[PROJECT_URL]', demo: null },
  },
  {
    id: 'cpp-algorithms',
    title: 'C++ / Algorithm Projects',
    category: 'Algorithm',
    summary: '以 C++ 實作的演算法與資料結構練習，包含 APCS 題型與解題紀錄。',
    highlights: ['排序、搜尋與圖論實作', '時間與空間複雜度分析', '解題筆記與程式碼整理'],
    technologies: ['C++', 'Algorithms', 'Data Structures'],
    image: 'images/projects/cpp-algorithms.svg',
    imageAlt: 'C++ / Algorithm 專案示意圖',
    links: { repo: '[PROJECT_URL]', demo: null },
  },
]

/** 篩選按鈕清單：All + 所有出現過的 category */
export const projectFilters = ['All', ...new Set(projects.map((project) => project.category))]
