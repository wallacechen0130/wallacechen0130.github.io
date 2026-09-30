import { counter } from '../data/counter.js'
import useVisitCounter from '../hooks/useVisitCounter.js'
import Icon from './Icon.jsx'
import './visit-counter.css'

/**
 * 網站瀏覽次數。
 * readOnly = true 時只讀取數字，不會把這次瀏覽算進去（後台使用）。
 */
export default function VisitCounter({ readOnly = false, className = '' }) {
  const count = useVisitCounter(counter, { countVisit: !readOnly })

  if (!counter.enabled || count === null) return null

  return (
    <span className={`visit-counter${className ? ` ${className}` : ''}`}>
      <Icon name="eye" size={15} />
      <span className="visit-counter__label">{counter.label}</span>
      <strong className="visit-counter__value">{count.toLocaleString('en-US')}</strong>
    </span>
  )
}
