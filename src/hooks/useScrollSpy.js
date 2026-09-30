import { useEffect, useRef, useState } from 'react'

/**
 * 監聽目前捲動到哪個 section，回傳對應的 id，
 * 讓 Navbar 可以高亮目前的段落。
 *
 * @param {string[]} ids section 的 id 清單（順序需與頁面一致）
 */
export default function useScrollSpy(ids) {
  const idsRef = useRef(ids)
  idsRef.current = ids

  const [activeId, setActiveId] = useState(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined

    const list = idsRef.current
    const elements = list.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })

        const next = list.find((id) => visible.has(id))
        if (next) setActiveId(next)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
