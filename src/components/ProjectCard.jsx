import { asset } from '../lib/asset.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SmartLink from './SmartLink.jsx'
import './project-card.css'

export default function ProjectCard({ project, delay = 0 }) {
  const featured = Boolean(project.featured)

  return (
    <Reveal
      as="article"
      className={`project-card${featured ? ' project-card--featured' : ''}`}
      delay={delay}
    >
      <div className="project-card__media">
        <img
          src={asset(project.image)}
          alt={project.imageAlt}
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
        />
        <span className="project-card__category">{project.category}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>

        {project.highlights?.length ? (
          <ul className="project-card__highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <Icon name="check" size={15} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="project-card__tech">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip chip--sm">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <SmartLink className="btn btn--outline btn--sm" href={project.links.repo}>
            <Icon name="github" size={16} />
            <span>Source Code</span>
          </SmartLink>
          {project.links.demo ? (
            <SmartLink className="btn btn--ghost btn--sm" href={project.links.demo}>
              <Icon name="external-link" size={16} />
              <span>Live Demo</span>
            </SmartLink>
          ) : null}
        </div>
      </div>
    </Reveal>
  )
}
