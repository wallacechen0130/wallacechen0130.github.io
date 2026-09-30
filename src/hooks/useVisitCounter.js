import { useEffect, useState } from 'react'

// 讀取（並累加）網站的瀏覽次數。
//
// countVisit = false 時只讀取目前數字，不會 +1（後台就是用這個模式）。
// 同一個 browser session 只會累加一次，避免重新整理就把數字衝高。
export default function useVisitCounter(config, { countVisit = true } = {}) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (!config?.enabled || !config.endpoint) return undefined

    const storageKey = `visit-counted:${config.namespace}:${config.key}`
    let counted
    try {
      counted = sessionStorage.getItem(storageKey) === 'yes'
    } catch {
      counted = false
    }

    const action = countVisit && !counted ? 'hit' : 'get'
    const controller = new AbortController()

    fetch(`${config.endpoint}/${action}/${config.namespace}/${config.key}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('bad response'))))
      .then((data) => {
        const value = Number(data?.value)
        if (Number.isFinite(value)) {
          setCount(value)
          try {
            sessionStorage.setItem(storageKey, 'yes')
          } catch {
            /* 無痕模式忽略 */
          }
        }
      })
      .catch(() => {
        /* 服務不可用時就靜靜地不顯示 */
      })

    return () => controller.abort()
  }, [config, countVisit])

  return count
}
