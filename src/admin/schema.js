// 後台表單的欄位定義
//
// 每一個 schema 對應一個 JSON 檔。新增欄位只要在這裡加一筆，
// 後台表單會自動長出對應的輸入框；沒列在這裡的欄位仍會保留在檔案中。

export const ICON_OPTIONS = [
  'github',
  'mail',
  'telegram',
  'discord',
  'link',
  'external-link',
  'code',
  'terminal',
  'braces',
  'layout',
  'layers',
  'git',
  'gamepad',
  'cube',
  'sparkles',
  'send',
  'message',
  'image',
  'cpu',
  'target',
  'flask',
  'book',
  'search',
  'file',
  'map-pin',
  'download',
  'check',
  'copy',
  'graduation',
  'user',
  'briefcase',
  'zap',
  'lock',
  'info',
]

export const PORTFOLIO_TYPES = ['github', 'pdf', 'image', 'report', 'research', 'experiment', 'link']

const profileSchema = {
  id: 'profile',
  label: '個人資料',
  path: 'src/data/profile.json',
  icon: 'user',
  hint: '首頁、About 與 Contact 區塊顯示的內容',
  fields: [
    { key: 'name', label: '姓名', type: 'text', help: '顯示在 Hero 大標、導覽列與 SEO 標題' },
    { key: 'nameZh', label: '頁尾顯示名稱', type: 'text', help: '留空就顯示上面的姓名' },
    { key: 'roleEn', label: '英文職稱', type: 'text' },
    { key: 'role', label: '中文職稱', type: 'text' },
    { key: 'tagline', label: '一句話介紹', type: 'textarea' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'location', label: '所在地', type: 'text', help: '留空就不顯示' },
    { key: 'avatar', label: '大頭貼', type: 'image', help: '建議使用正方形照片' },
    { key: 'avatarAlt', label: '大頭貼說明', type: 'text' },
    { key: 'focusAreas', label: '關注領域標籤', type: 'stringList' },
    {
      key: 'codeCard',
      label: 'Hero 程式碼卡片',
      type: 'object',
      help: '首頁右上角那張裝飾用的卡片',
      fields: [
        { key: 'filename', label: '檔名', type: 'text' },
        { key: 'variable', label: '變數名稱', type: 'text' },
        {
          key: 'lines',
          label: '顯示內容',
          type: 'objectList',
          itemLabel: '欄位',
          titleField: 'key',
          fields: [
            { key: 'key', label: '名稱', type: 'text' },
            { key: 'value', label: '值', type: 'text', help: "建議加上引號，例如 'Wallace'" },
          ],
        },
      ],
    },
    {
      key: 'about',
      label: 'About Me',
      type: 'object',
      fields: [
        { key: 'intro', label: '標題下方說明', type: 'textarea' },
        { key: 'paragraphs', label: '段落', type: 'stringList', multiline: true },
        {
          key: 'facts',
          label: '快速資訊',
          type: 'objectList',
          itemLabel: '項目',
          titleField: 'label',
          fields: [
            { key: 'id', label: '識別碼', type: 'text', help: '英文代號，不重複即可' },
            { key: 'label', label: '名稱', type: 'text' },
            { key: 'value', label: '內容', type: 'text' },
          ],
        },
      ],
    },
    {
      key: 'contact',
      label: 'Contact 文案',
      type: 'object',
      fields: [
        { key: 'heading', label: '標題', type: 'text' },
        { key: 'text', label: '說明', type: 'textarea' },
      ],
    },
    {
      key: 'links',
      label: '對外連結',
      type: 'objectList',
      itemLabel: '連結',
      titleField: 'label',
      fields: [
        { key: 'id', label: '識別碼', type: 'text', help: '英文代號，不重複即可' },
        { key: 'label', label: '名稱', type: 'text' },
        { key: 'icon', label: '圖示', type: 'select', options: ICON_OPTIONS },
        { key: 'href', label: '連結', type: 'text', help: 'Email 請填 mailto:you@example.com' },
        { key: 'handle', label: '顯示文字', type: 'text' },
        { key: 'description', label: '說明', type: 'text' },
        { key: 'enabled', label: '顯示在網站上', type: 'boolean' },
      ],
    },
  ],
}

const projectsSchema = {
  id: 'projects',
  label: '專案',
  path: 'src/data/projects.json',
  icon: 'layers',
  hint: 'Projects 區塊的卡片。相同 category 會自動變成一個篩選按鈕',
  fields: [
    {
      key: 'projects',
      label: '專案列表',
      type: 'objectList',
      itemLabel: '專案',
      titleField: 'title',
      fields: [
        { key: 'id', label: '識別碼', type: 'text', help: '英文代號，不重複即可' },
        { key: 'title', label: '專案名稱', type: 'text' },
        { key: 'category', label: '分類', type: 'text', help: '例如 AI、Bot、Web' },
        { key: 'featured', label: '設為主打（桌面版佔兩欄）', type: 'boolean' },
        { key: 'summary', label: '專案說明', type: 'textarea' },
        { key: 'highlights', label: '重點條列', type: 'stringList', multiline: true },
        { key: 'technologies', label: '使用技術', type: 'stringList' },
        { key: 'image', label: '專案圖片', type: 'image', help: '建議 2:1 比例（例如 1200×600）' },
        { key: 'imageAlt', label: '圖片說明', type: 'text' },
        {
          key: 'links',
          label: '連結',
          type: 'object',
          fields: [
            {
              key: 'repo',
              label: 'GitHub 網址',
              type: 'text',
              nullable: true,
              help: '留空 = 顯示「程式碼未公開」',
            },
            { key: 'demo', label: 'Demo 網址', type: 'text', nullable: true },
          ],
        },
      ],
    },
  ],
}

const skillsSchema = {
  id: 'skills',
  label: '技能',
  path: 'src/data/skills.json',
  icon: 'target',
  hint: 'Skills 區塊的技能卡片',
  fields: [
    {
      key: 'skillGroups',
      label: '技能分類',
      type: 'objectList',
      itemLabel: '分類',
      titleField: 'label',
      fields: [
        { key: 'id', label: '識別碼', type: 'text' },
        { key: 'label', label: '分類名稱', type: 'text' },
        {
          key: 'items',
          label: '技能',
          type: 'objectList',
          itemLabel: '技能',
          titleField: 'name',
          fields: [
            { key: 'id', label: '識別碼', type: 'text' },
            { key: 'name', label: '名稱', type: 'text' },
            { key: 'icon', label: '圖示', type: 'select', options: ICON_OPTIONS },
            { key: 'description', label: '說明', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}

const portfolioSchema = {
  id: 'portfolio',
  label: '作品集',
  path: 'src/data/portfolio.json',
  icon: 'file',
  hint: '學校專題、報告、研究與實驗紀錄',
  fields: [
    {
      key: 'portfolioCategories',
      label: '分類按鈕',
      type: 'stringList',
      help: '第一個建議保留 All（顯示全部）',
    },
    {
      key: 'portfolioItems',
      label: '作品列表',
      type: 'objectList',
      itemLabel: '作品',
      titleField: 'title',
      fields: [
        { key: 'id', label: '識別碼', type: 'text' },
        { key: 'title', label: '名稱', type: 'text' },
        { key: 'category', label: '分類', type: 'text', help: '要跟上面的分類按鈕一致' },
        { key: 'type', label: '類型', type: 'select', options: PORTFOLIO_TYPES },
        { key: 'description', label: '說明', type: 'textarea' },
        { key: 'tags', label: '標籤', type: 'stringList' },
        {
          key: 'date',
          label: '日期',
          type: 'text',
          nullable: true,
          help: '例如 2025-06，留空就不顯示',
        },
        {
          key: 'url',
          label: '連結',
          type: 'text',
          nullable: true,
          help: 'PDF、圖片或網址都可以；留空顯示「內容整理中」',
        },
      ],
    },
  ],
}

const learningSchema = {
  id: 'learning',
  label: '學習歷程',
  path: 'src/data/learning.json',
  icon: 'git',
  hint: 'Learning Journey 時間軸，陣列順序就是顯示順序',
  fields: [
    {
      key: 'learningJourney',
      label: '階段',
      type: 'objectList',
      itemLabel: '階段',
      titleField: 'title',
      fields: [
        { key: 'id', label: '識別碼', type: 'text' },
        { key: 'title', label: '標題', type: 'text' },
        {
          key: 'period',
          label: '時間',
          type: 'text',
          nullable: true,
          help: '例如 2024，留空就不顯示',
        },
        { key: 'description', label: '說明', type: 'textarea' },
        { key: 'tags', label: '標籤', type: 'stringList' },
      ],
    },
  ],
}

export const schemas = [
  profileSchema,
  projectsSchema,
  skillsSchema,
  portfolioSchema,
  learningSchema,
]
