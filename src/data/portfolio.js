/**
 * 作品集設定檔（學校報告、研究、實驗與其他文件）
 *
 * 下面的項目都是「範例資料」，請替換成你自己的作品：
 * 把 sample 改成 false（或直接刪掉這個欄位），就不會再顯示「範例」標記。
 *
 * type 可用的值：'github' | 'pdf' | 'image' | 'report' | 'research' | 'experiment' | 'link'
 * url 還沒填時請保留 [PROJECT_URL]，網站會顯示成「未設定」而不是壞連結。
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
    id: 'school-project-sample',
    title: '範例：課程專題作品',
    category: 'School Projects',
    type: 'github',
    sample: true,
    description: '課程專題的內容說明：主題、你負責的部分，以及最後的成果。',
    tags: ['C++', '資料結構'],
    date: null,
    url: '[PROJECT_URL]',
  },
  {
    id: 'report-sample',
    title: '範例：技術主題報告',
    category: 'Reports',
    type: 'pdf',
    sample: true,
    description: '報告檔案說明，例如主題、頁數或大綱，讓閱讀的人知道會看到什麼。',
    tags: ['PDF', '書面報告'],
    date: null,
    url: '[PROJECT_URL]',
  },
  {
    id: 'research-sample',
    title: '範例：專題研究紀錄',
    category: 'Research',
    type: 'research',
    sample: true,
    description: '研究動機、方法與目前進度的整理，可以連結到文件或簡報。',
    tags: ['AI', '研究'],
    date: null,
    url: '[PROJECT_URL]',
  },
  {
    id: 'experiment-sample',
    title: '範例：模型實驗紀錄',
    category: 'Experiments',
    type: 'experiment',
    sample: true,
    description: '實驗設定的參數、比較結果與觀察，例如不同提示詞對輸出的影響。',
    tags: ['LLM', '實驗'],
    date: null,
    url: '[PROJECT_URL]',
  },
  {
    id: 'cs-portfolio-sample',
    title: '範例：資訊工程學習作品集',
    category: 'Computer Science Portfolio',
    type: 'link',
    sample: true,
    description: '彙整所有作品、學習歷程與成果的文件或連結，可用於升學備審資料。',
    tags: ['作品集', '備審資料'],
    date: null,
    url: '[PROJECT_URL]',
  },
]
