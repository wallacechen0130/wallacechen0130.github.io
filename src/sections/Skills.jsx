import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SkillCard from '../components/SkillCard.jsx'
import { skillGroups } from '../data/skills.js'
import './skills.css'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Skills & Tools"
          lead="目前實際使用過的技術與工具。這裡只列出用過的項目與用途，不做等級評分。"
        />

        <div className="skills__groups">
          {skillGroups.map((group) => (
            <div key={group.id} className="skills__group">
              <Reveal as="h3" className="skills__group-title">
                {group.label}
              </Reveal>
              <ul className="skills__grid">
                {group.items.map((skill, index) => (
                  <li key={skill.id}>
                    <SkillCard skill={skill} delay={index * 60} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
