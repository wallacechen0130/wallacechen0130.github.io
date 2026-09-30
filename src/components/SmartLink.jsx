import { isPlaceholder, PLACEHOLDER_HINT } from '../lib/placeholders.js'

// 會自動處理 placeholder 的連結：
//
// href 有填 → 產生正常的 <a>（外部連結自動加上 target / rel）
// href 還是 [PROJECT_URL] 之類的 placeholder → 產生不可點擊的 <span>，
// 避免部署後出現連到不存在頁面的壞連結。
export default function SmartLink({
  href,
  children,
  className = '',
  placeholderLabel,
  ...rest
}) {
  const resolved = typeof href === 'string' ? href.trim() : ''

  if (!resolved || isPlaceholder(resolved)) {
    return (
      <span
        className={`${className} is-placeholder`.trim()}
        aria-disabled="true"
        title={PLACEHOLDER_HINT}
        {...rest}
      >
        {children}
        {placeholderLabel ? <span className="is-placeholder__label">{placeholderLabel}</span> : null}
      </span>
    )
  }

  const external = /^https?:/i.test(resolved)

  return (
    <a
      className={className}
      href={resolved}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
