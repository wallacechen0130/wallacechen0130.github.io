import { portfolioTypes } from '../data/portfolio.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SmartLink from './SmartLink.jsx'
import './portfolio-card.css'

export default function PortfolioCard({ item, delay = 0 }) {
  const type = portfolioTypes[item.type] ?? portfolioTypes.link

  return (
    <Reveal as="article" className="portfolio-card" delay={delay}>
      <div className="portfolio-card__head">
        <span className="portfolio-card__icon" aria-hidden="true">
          <Icon name={type.icon} size={20} />
        </span>
        <span className="portfolio-card__type">{type.label}</span>
        {item.sample ? <span className="badge badge--sample">範例</span> : null}
      </div>

      <h3 className="portfolio-card__title">{item.title}</h3>
      <p className="portfolio-card__description">{item.description}</p>

      {item.tags?.length ? (
        <ul className="portfolio-card__tags">
          {item.tags.map((tag) => (
            <li key={tag} className="chip chip--sm">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="portfolio-card__foot">
        <span className="portfolio-card__category">{item.category}</span>
        <SmartLink className="portfolio-card__link" href={item.url}>
          <span>開啟</span>
          <Icon name="arrow-right" size={16} />
        </SmartLink>
      </div>
    </Reveal>
  )
}
