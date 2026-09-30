import { useMemo, useState } from 'react'
import PlaceholderNotice from '../components/PlaceholderNotice.jsx'
import PortfolioCard from '../components/PortfolioCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { portfolioCategories, portfolioItems } from '../data/portfolio.js'
import { containsPlaceholder } from '../lib/placeholders.js'
import './portfolio.css'

export default function Portfolio() {
  const [category, setCategory] = useState('All')

  const visibleItems = useMemo(
    () =>
      category === 'All'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === category),
    [category],
  )

  const hasSamples = portfolioItems.some((item) => item.sample)
  const hasPlaceholderUrls = portfolioItems.some((item) => containsPlaceholder(item.url))

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Portfolio & Documents"
          lead="學校專題、報告、研究與實驗紀錄。支援 PDF、圖片、GitHub 專案與外部連結。"
        />

        {hasSamples || hasPlaceholderUrls ? (
          <PlaceholderNotice>
            目前顯示的是範例資料。請在 <code>src/data/portfolio.js</code> 換成你自己的作品，並把
            <code> sample </code>改成 <code>false</code>，「範例」標記就會消失。
          </PlaceholderNotice>
        ) : null}

        <div className="portfolio__tabs" role="group" aria-label="作品集分類">
          {portfolioCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={`filter-chip${category === item ? ' is-active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="portfolio__grid">
          {visibleItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} delay={index * 70} />
          ))}
        </div>
      </div>
    </section>
  )
}
