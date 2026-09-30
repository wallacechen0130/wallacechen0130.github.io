import { useEffect, useRef, useState } from 'react'

// 捲動進入畫面時淡入的容器。
//
// 使用 IntersectionObserver，第一次進入畫面後就停止觀察，不影響捲動效能。
// 使用者開啟「減少動態效果」時直接顯示內容，不做動畫。
// delay 可以讓同一區塊的卡片依序出現（單位：毫秒）。
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
