// 產生 public/ 資料夾內資源的完整路徑。
//
// GitHub Pages 可能是部署在子路徑（例如 /portfolio/），
// 圖片必須加上 Vite 的 BASE_URL 才不會 404。
//
// 用法：asset('images/avatar.svg')
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`
}
