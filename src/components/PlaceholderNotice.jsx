import Icon from './Icon.jsx'
import './placeholder-notice.css'

// 資料檔裡還有 placeholder 時顯示的提示，填完資料就會自動消失。
export default function PlaceholderNotice({ children }) {
  return (
    <p className="placeholder-notice">
      <Icon name="info" size={18} />
      <span>{children}</span>
    </p>
  )
}
