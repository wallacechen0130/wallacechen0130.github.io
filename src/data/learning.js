/**
 * 學習歷程（讀取 learning.json）
 *
 * 實際內容放在同資料夾的 learning.json，可以直接用網站後台修改：
 *   https://wallacechen0130.github.io/#/admin
 *
 * period 填 null 時網站會自動隱藏時間標籤。
 */
import data from './learning.json'

export const learningJourney = data.learningJourney
