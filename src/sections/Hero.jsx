import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { getLink, profile } from '../data/profile.js'
import './hero.css'

export default function Hero() {
  const github = getLink('github')
  const { filename, variable, lines } = profile.codeCard

  return (
    <section id="home" className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__grid" />
        <span className="hero__glow" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal as="p" className="hero__eyebrow">
            <span className="hero__status" aria-hidden="true" />
            {profile.role}
          </Reveal>

          <Reveal as="h1" className="hero__title" delay={60}>
            {profile.name}
          </Reveal>

          <Reveal as="p" className="hero__subtitle" delay={110}>
            {profile.roleEn}
          </Reveal>

          <Reveal as="p" className="hero__tagline" delay={160}>
            {profile.tagline}
          </Reveal>

          <Reveal className="hero__actions" delay={210}>
            <a className="btn btn--primary btn--lg" href="#projects">
              <span>View Projects</span>
              <Icon name="arrow-right" size={18} />
            </a>
            <SmartLink className="btn btn--outline btn--lg" href={github?.href}>
              <Icon name="github" size={18} />
              <span>GitHub</span>
            </SmartLink>
          </Reveal>

          <Reveal as="ul" className="hero__focus" delay={260}>
            {profile.focusAreas.map((area) => (
              <li key={area} className="chip">
                {area}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="hero__aside" delay={180}>
          <div className="code-card">
            <div className="code-card__bar">
              <span className="code-card__dot" aria-hidden="true" />
              <span className="code-card__dot" aria-hidden="true" />
              <span className="code-card__dot" aria-hidden="true" />
              <span className="code-card__filename">{filename}</span>
            </div>
            <pre className="code-card__body">
              <code>
                <span className="tok-keyword">const</span>{' '}
                <span className="tok-name">{variable}</span>{' '}
                <span className="tok-punct">{'= {'}</span>
                {'\n'}
                {lines.map((line) => (
                  <span key={line.key}>
                    {'  '}
                    <span className="tok-property">{line.key}</span>
                    <span className="tok-punct">: </span>
                    <span className="tok-string">{line.value}</span>
                    <span className="tok-punct">,</span>
                    {'\n'}
                  </span>
                ))}
                <span className="tok-punct">{'}'}</span>
              </code>
            </pre>
          </div>
        </Reveal>
      </div>

      <a className="hero__scroll" href="#about" aria-label="捲動至 About 區塊">
        <Icon name="chevron-down" size={18} />
      </a>
    </section>
  )
}
