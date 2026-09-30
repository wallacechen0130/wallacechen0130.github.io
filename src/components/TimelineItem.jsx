import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import './timeline-item.css'

export default function TimelineItem({ step, delay = 0 }) {
  return (
    <Reveal as="li" className="timeline-item" delay={delay}>
      <span className="timeline-item__node" aria-hidden="true">
        <Icon name="check" size={14} strokeWidth={2.5} />
      </span>

      <div className="timeline-item__card">
        <div className="timeline-item__head">
          <h3 className="timeline-item__title">{step.title}</h3>
          {step.period ? <span className="timeline-item__period">{step.period}</span> : null}
        </div>
        <p className="timeline-item__description">{step.description}</p>
        {step.tags?.length ? (
          <ul className="timeline-item__tags">
            {step.tags.map((tag) => (
              <li key={tag} className="chip chip--sm">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  )
}
