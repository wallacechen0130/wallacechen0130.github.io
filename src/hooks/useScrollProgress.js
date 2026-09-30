import { useEffect, useState } from 'react'

/**
 * 回傳 { scrolled, progress }：
 * - scrolled：是否已經離開頁面頂端（Navbar 顯示陰影用）
 * - progress：整頁的捲動進度 0 ~ 1（Navbar 進度條用）
 *
 * 用 requestAnimationFrame 節流，避免每次 scroll 事件都觸發重新渲染。
 */
export default function useScrollProgress() {
  const [state, setState] = useState({ scrolled: false, progress: 0 })

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setState({ scrolled: window.scrollY > 8, progress })
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return state
}
