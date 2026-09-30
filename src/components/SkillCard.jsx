import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import './skill-card.css'

export default function SkillCard({ skill, delay = 0 }) {
  return (
    <Reveal as="article" className="skill-card" delay={delay}>
      <span className="skill-card__icon" aria-hidden="true">
        <Icon name={skill.icon} size={22} />
      </span>
      <h3 className="skill-card__name">{skill.name}</h3>
      <p className="skill-card__description">{skill.description}</p>
    </Reveal>
  )
}
