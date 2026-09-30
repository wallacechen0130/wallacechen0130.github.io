/**
 * 技能（讀取 skills.json）
 *
 * 實際內容放在同資料夾的 skills.json，可以直接用網站後台修改：
 *   https://wallacechen0130.github.io/#/admin
 */
import data from './skills.json'

export const skillGroups = data.skillGroups

/** 給 SEO 結構化資料使用的技能名稱清單 */
export const skillNames = skillGroups.flatMap((group) => group.items.map((item) => item.name))
