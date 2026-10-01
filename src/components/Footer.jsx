import { navigation } from '../data/navigation.js'
import { activeLinks, profile } from '../data/profile.js'
import Icon from './Icon.jsx'
import SmartLink from './SmartLink.jsx'
import VisitCounter from './VisitCounter.jsx'
import BoomButton from './BoomButton.jsx'
import './footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{profile.nameZh || profile.name}</p>
          <p className="footer__role">{profile.roleEn}</p>
        </div>

        <nav className="footer__nav" aria-label="頁尾導覽">
          <ul className="footer__list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__social">
          {activeLinks.map((link) => (
            <li key={link.id}>
              <SmartLink
                className="footer__social-link"
                href={link.href}
                aria-label={link.label}
              >
                <Icon name={link.icon} size={18} />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="footer__meta">
          <VisitCounter />
          <BoomButton />
          <p className="footer__built">Built with React + Vite · Deployed on GitHub Pages</p>
        </div>
      </div>
    </footer>
  )
}
