import { useCallback, useEffect, useRef, useState } from 'react'
import { explodePage } from '../lib/boom.js'
import Icon from './Icon.jsx'
import './boom.css'

// 頁尾的小彩蛋：按下去整頁碎掉掉落，可以一鍵復原。
export default function BoomButton() {
  const handleRef = useRef(null)
  const [active, setActive] = useState(false)

  // 元件被卸載時（例如切到後台）確保覆蓋層不會留在畫面上
  useEffect(
    () => () => {
      handleRef.current?.restore()
      handleRef.current = null
    },
    [],
  )

  const handleClick = useCallback(() => {
    if (handleRef.current) {
      handleRef.current.restore()
      return
    }

    handleRef.current = explodePage({
      root: document.getElementById('root'),
      onRestore: () => {
        handleRef.current = null
        setActive(false)
      },
    })
    setActive(true)
  }, [])

  return (
    <button
      type="button"
      className="boom-btn"
      onClick={handleClick}
      aria-label="一鍵爆破這個網頁（純視覺特效，可以復原）"
    >
      <Icon name="zap" size={15} />
      <span>{active ? '重新組裝' : '一鍵爆破這個網頁'}</span>
    </button>
  )
}
