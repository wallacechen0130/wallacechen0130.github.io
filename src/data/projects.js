/**
 * 專案（讀取 projects.json）
 *
 * 實際內容放在同資料夾的 projects.json，可以直接用網站後台修改：
 *   https://wallacechen0130.github.io/#/admin
 *
 * links.repo 填 null 表示程式碼未公開，卡片會顯示「程式碼未公開」。
 */
import data from './projects.json'

export const projects = data.projects

/** 篩選按鈕清單：All + 所有出現過的 category */
export const projectFilters = ['All', ...new Set(projects.map((project) => project.category))]
