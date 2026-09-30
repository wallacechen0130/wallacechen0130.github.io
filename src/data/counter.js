/**
 * 瀏覽計數器設定
 *
 * 這個網站是靜態網站（沒有伺服器），所以「全站瀏覽次數」是透過免費的
 * Abacus 服務（https://abacus.jasoncameron.dev）計算：
 * 每次有人開啟網站，瀏覽器會打一次 API，讓該服務的計數 +1 並回傳目前數字。
 *
 * - 同一個瀏覽器「工作階段」只會算一次（重新整理不會重複累加）
 * - 服務掛掉或連不上時，計數器會直接不顯示，不影響網站其他部分
 * - 這個請求會讓該服務看到訪客的 IP；不想用就把 enabled 改成 false
 */
export const counter = {
  enabled: true,
  /** 服務網址，之後想換成自己的服務只要改這裡 */
  endpoint: 'https://abacus.jasoncameron.dev',
  /** 命名空間與 key：全球唯一即可，換一組就會從 0 重新算 */
  namespace: 'wallacechen0130-portfolio',
  key: 'visits',
  /** 顯示在頁尾的文字 */
  label: '瀏覽次數',
}
