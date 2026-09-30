import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { asset } from '../lib/asset.js'
import { profile } from '../data/profile.js'
import './about.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading eyebrow="About" title="About Me" lead={profile.about.intro} />

        <div className="about__grid">
          <Reveal className="about__aside">
            <div className="about__avatar-frame">
              <img
                className="about__avatar"
                src={asset(profile.avatar)}
                alt={profile.avatarAlt}
                width="480"
                height="480"
                loading="lazy"
                decoding="async"
              />
            </div>

            <ul className="about__facts">
              {profile.about.facts.map((fact) => (
                <li key={fact.id} className="about__fact">
                  <span className="about__fact-label">{fact.label}</span>
                  <span className="about__fact-value">{fact.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about__body" delay={100}>
            {profile.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 12)} className="about__paragraph">
                {paragraph}
              </p>
            ))}

            <div className="about__focus">
              <h3 className="about__focus-title">學習與關注方向</h3>
              <ul className="about__focus-list">
                {profile.focusAreas.map((area) => (
                  <li key={area} className="chip">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
