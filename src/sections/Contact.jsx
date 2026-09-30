import Icon from '../components/Icon.jsx'
import PlaceholderNotice from '../components/PlaceholderNotice.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { activeLinks, getLink, profile } from '../data/profile.js'
import { containsPlaceholder } from '../lib/placeholders.js'
import './contact.css'

export default function Contact() {
  const email = getLink('email')
  const github = getLink('github')
  const hasPlaceholders = containsPlaceholder(profile.email, profile.links)
  const hasLocation = profile.location && !containsPlaceholder(profile.location)

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          lead="如果你對我的作品有興趣，或想討論合作、實習與技術問題，歡迎直接聯絡我。"
        />

        {hasPlaceholders ? (
          <PlaceholderNotice>
            聯絡資訊還是 placeholder。請在 <code>src/data/profile.js</code> 填入你的 GitHub
            帳號與 Email。
          </PlaceholderNotice>
        ) : null}

        <div className="contact__grid">
          <Reveal className="contact__card">
            <h3 className="contact__card-title">一起做點東西</h3>
            <p className="contact__card-text">
              目前正在累積作品與學習經驗，對 AI 應用、遊戲開發與 Bot 專案特別有興趣。
              有想法或機會都歡迎寄信給我。
            </p>

            <div className="contact__actions">
              <SmartLink className="btn btn--primary btn--lg" href={email?.href}>
                <Icon name="mail" size={18} />
                <span>寄 Email 給我</span>
              </SmartLink>
              <SmartLink className="btn btn--outline btn--lg" href={github?.href}>
                <Icon name="github" size={18} />
                <span>GitHub</span>
              </SmartLink>
            </div>

            {hasLocation ? (
              <p className="contact__location">
                <Icon name="map-pin" size={16} />
                <span>{profile.location}</span>
              </p>
            ) : null}
          </Reveal>

          <ul className="contact__list">
            {activeLinks.map((link, index) => (
              <Reveal as="li" key={link.id} className="contact__item" delay={index * 60}>
                <span className="contact__icon" aria-hidden="true">
                  <Icon name={link.icon} size={20} />
                </span>
                <div className="contact__item-body">
                  <p className="contact__item-label">{link.label}</p>
                  <SmartLink className="contact__item-handle" href={link.href}>
                    {link.handle}
                  </SmartLink>
                  <p className="contact__item-description">{link.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
