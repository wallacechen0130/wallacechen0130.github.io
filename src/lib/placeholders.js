/**
 * Placeholder 偵測工具
 *
 * 資料檔裡還沒填的欄位會使用 [YOUR_XXX] / [PROJECT_XXX] 這種格式。
 * 網站靠這個檔案判斷哪些連結還沒設定，並改以「未設定」樣式呈現，
 * 避免部署後產生連到不存在帳號的壞連結。
 */
const PLACEHOLDER_PATTERN = /\[(?:YOUR|PROJECT)_[A-Z0-9_]+\]/

/** 字串是否是尚未填寫的 placeholder */
export function isPlaceholder(value) {
  return typeof value === 'string' && PLACEHOLDER_PATTERN.test(value)
}

/** 一組資料中是否還有任何 placeholder（用來顯示提示訊息） */
export function containsPlaceholder(...values) {
  return values.some((value) => {
    if (Array.isArray(value)) return containsPlaceholder(...value)
    if (value && typeof value === 'object') return containsPlaceholder(...Object.values(value))
    return isPlaceholder(value)
  })
}

/** 滑鼠移上去時顯示的說明 */
export const PLACEHOLDER_HINT = '這個連結還沒設定，請到 src/data 資料檔填入實際網址'
