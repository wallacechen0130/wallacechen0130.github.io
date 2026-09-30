import Reveal from './Reveal.jsx'

// 每個 section 共用的標題區塊：小標（eyebrow）+ 主標題 + 說明文字。
export default function SectionHeading({ eyebrow, title, lead, id, className = '' }) {
  return (
    <Reveal className={`section-heading${className ? ` ${className}` : ''}`}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {lead ? <p className="section-heading__lead">{lead}</p> : null}
    </Reveal>
  )
}
