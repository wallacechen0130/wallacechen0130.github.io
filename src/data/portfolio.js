/**
 * 作品集（讀取 portfolio.json）
 *
 * 實際內容放在同資料夾的 portfolio.json，可以直接用網站後台修改：
 *   https://wallacechen0130.github.io/#/admin
 */
import data from './portfolio.json'

export const portfolioCategories = data.portfolioCategories
export const portfolioItems = data.portfolioItems

/** 每一種類型的顯示圖示與標籤（UI 設定，不是內容） */
export const portfolioTypes = {
  github: { icon: 'github', label: 'GitHub' },
  pdf: { icon: 'file', label: 'PDF' },
  image: { icon: 'image', label: '圖片' },
  report: { icon: 'book', label: '報告' },
  research: { icon: 'search', label: '研究' },
  experiment: { icon: 'flask', label: '實驗' },
  link: { icon: 'link', label: '連結' },
}
