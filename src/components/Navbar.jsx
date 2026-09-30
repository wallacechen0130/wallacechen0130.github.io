import { useCallback, useEffect, useState } from 'react'
import { navigation } from '../data/navigation.js'
import { getInitials, getLink, profile } from '../data/profile.js'
import useScrollProgress from '../hooks/useScrollProgress.js'
import useScrollSpy from '../hooks/useScrollSpy.js'
import Icon from './Icon.jsx'
import SmartLink from './SmartLink.jsx'
import './navbar.css'

// section id 清單固定不變，放在模組層級避免每次 render 重新建立陣列。
const SECTION_IDS = navigation.map((item) => item.id)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrolled, progress } = useScrollProgress()
  const activeId = useScrollSpy(SECTION_IDS)
  const github = getLink('github')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // 手機選單開啟時：鎖住背景捲動、支援 Esc 關閉、放大到桌面版時自動關閉。
  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    const mediaQuery = window.matchMedia('(min-width: 900px)')
    const onBreakpointChange = (event) => {
      if (event.matches) closeMenu()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    mediaQuery.addEventListener('change', onBreakpointChange)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      mediaQuery.removeEventListener('change', onBreakpointChange)
    }
  }, [menuOpen, closeMenu])

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div
        className="navbar__progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div className="container navbar__inner">
        <a className="navbar__brand" href="#home" onClick={closeMenu}>
          <span className="navbar__mark" aria-hidden="true">
            {getInitials()}
          </span>
          <span className="navbar__brand-text">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </a>

        <nav className="navbar__nav" aria-label="主要導覽">
          <ul className="navbar__list">
            {navigation.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    className={`navbar__link${isActive ? ' is-active' : ''}`}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="navbar__actions">
          <SmartLink className="btn btn--primary btn--sm navbar__cta" href={github?.href}>
            <Icon name="github" size={17} />
            <span>GitHub</span>
          </SmartLink>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div
        id="navbar-menu"
        className={`navbar__mobile${menuOpen ? ' is-visible' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="行動版導覽">
          <ul className="navbar__mobile-list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  className={`navbar__mobile-link${activeId === item.id ? ' is-active' : ''}`}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                  <Icon name="arrow-right" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SmartLink className="btn btn--outline navbar__mobile-cta" href={github?.href}>
          <Icon name="github" size={18} />
          <span>GitHub</span>
        </SmartLink>
      </div>
    </header>
  )
}
