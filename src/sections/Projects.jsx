import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import PlaceholderNotice from '../components/PlaceholderNotice.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { getLink } from '../data/profile.js'
import { projectFilters, projects } from '../data/projects.js'
import { containsPlaceholder } from '../lib/placeholders.js'
import './projects.css'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const github = getLink('github')

  const visibleProjects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  const hasPlaceholderLinks = projects.some((project) => containsPlaceholder(project.links))

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Projects"
          lead="目前正在進行與已完成的作品分類。每個專案都包含使用的技術與原始碼連結。"
        />

        {hasPlaceholderLinks ? (
          <PlaceholderNotice>
            專案連結目前還是 placeholder，請在 <code>src/data/projects.js</code> 填入實際的 GitHub
            網址。
          </PlaceholderNotice>
        ) : null}

        <div className="projects__filters" role="group" aria-label="專案分類">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={`filter-chip${filter === item ? ' is-active' : ''}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 70} />
          ))}
        </div>

        <div className="projects__footer">
          <p className="projects__footer-text">想看更多實驗與練習專案？</p>
          <SmartLink className="btn btn--primary" href={github?.href}>
            <Icon name="github" size={18} />
            <span>前往 GitHub</span>
          </SmartLink>
        </div>
      </div>
    </section>
  )
}
