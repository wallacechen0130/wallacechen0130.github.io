/**
 * 個人資料（讀取 profile.json）
 *
 * 實際內容放在同資料夾的 profile.json，可以直接用網站後台修改：
 *   https://wallacechen0130.github.io/#/admin
 *
 * 這個檔案只負責把資料匯出給 UI 使用，通常不需要修改。
 */
import data from './profile.json'

export const profile = data

/** 只回傳有開啟的連結 */
export const activeLinks = profile.links.filter((link) => link.enabled)

/** 取得指定 id 的連結（找不到時回傳 undefined） */
export function getLink(id) {
  return activeLinks.find((link) => link.id === id)
}

/** Navbar 顯示用的縮寫：英文名字取字首，中文名字取第一個字 */
export function getInitials(name = profile.name) {
  if (/\[|\]/.test(name)) return '</>'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '</>'
  // 中文名字只有一段時取第一個字（例如「陳品璁」→「陳」）
  if (parts.length === 1 && !/^[\x20-\x7E]+$/.test(parts[0])) return parts[0].slice(0, 1)
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
