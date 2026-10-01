// 「一鍵爆破這個網頁」特效
//
// 做法：把目前畫面複製一份放到最上層的覆蓋層，把複製品炸掉，
// 真正的 React DOM 只是暫時隱藏。這樣做有兩個好處：
//   1. 不會動到 React 管理的 DOM，不會出現 reconciliation 錯誤
//   2. 「重新組裝」只要把覆蓋層移除就好，不需要重新載入頁面

const PIECE_SELECTOR = [
  '.navbar',
  '.hero__eyebrow',
  '.code-card',
  '.about__avatar-frame',
  '.about__fact',
  '.about__focus',
  '.skill-card',
  '.project-card',
  '.portfolio-card',
  '.timeline-item',
  '.contact__card',
  '.contact__item',
  '.footer',
  '.visit-counter',
  '.boom-btn',
  '.footer__social-link',
  '.chip',
  '.btn',
  '.filter-chip',
].join(',')

const MAX_CHARS = 6000

/** 有多少比例的字會留在地上變成殘骸（其餘的飛出畫面） */
const DEBRIS_RATIO = 0.22

function random(min, max) {
  return Math.random() * (max - min) + min
}

function setMotion(element, { spin = 1, delayMax = 260, durMin = 1100, durMax = 2100 } = {}) {
  element.style.setProperty('--tx', `${random(-110, 110).toFixed(1)}px`)
  element.style.setProperty('--rot', `${random(-320 * spin, 320 * spin).toFixed(0)}deg`)
  element.style.setProperty('--delay', `${random(0, delayMax).toFixed(0)}ms`)
  element.style.setProperty('--dur', `${random(durMin, durMax).toFixed(0)}ms`)
}

/** 把元素裡每個字拆成一個獨立的 span，讓它們可以各自飛散 */
function shatterText(scope, viewport) {
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => (node.nodeValue && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  })

  const textNodes = []
  let node = walker.nextNode()
  while (node) {
    textNodes.push(node)
    node = walker.nextNode()
  }

  let charCount = 0

  // --- 第一階段：拆字（只寫 DOM，不做任何量測）---
  textNodes.forEach((textNode) => {
    const text = textNode.nodeValue
    if (charCount > MAX_CHARS) return

    const fragment = document.createDocumentFragment()
    for (const char of text) {
      charCount += 1
      // 空白保持原樣，避免英文單字之間的空格消失
      if (/\s/.test(char)) {
        fragment.appendChild(document.createTextNode(char))
        continue
      }
      if (charCount > MAX_CHARS) {
        fragment.appendChild(document.createTextNode(char))
        continue
      }
      const span = document.createElement('span')
      span.className = 'boom-char'
      span.textContent = char
      setMotion(span, { spin: 1, delayMax: 260, durMin: 1150, durMax: 2200 })
      fragment.appendChild(span)
    }

    textNode.parentNode?.replaceChild(fragment, textNode)
  })

  // --- 第二階段：挑出會變成殘骸的字 ---
  // 排除兩種字：
  //   1. 在掉落卡片裡面的字（卡片會把字一起帶走，落點會算錯）
  //   2. 還沒進場的區塊（.reveal 但沒有 is-visible）裡的字，那些字本來就是透明的
  const chars = [...scope.querySelectorAll('.boom-char')]
  const candidates = chars.filter(
    (char) => !char.closest('.boom-piece, .reveal:not(.is-visible)'),
  )
  const debrisTarget = Math.round(candidates.length * DEBRIS_RATIO)
  const pool = candidates.slice()
  const debris = []
  for (let index = 0; index < debrisTarget && pool.length; index += 1) {
    debris.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  }

  // --- 第三階段：一次量測全部落點（避免讀寫交錯造成 reflow）---
  const rects = debris.map((element) => element.getBoundingClientRect())

  // --- 第四階段：一次寫入落點 ---
  const groundY = viewport.height - 12
  const bandHeight = Math.max(60, Math.min(140, viewport.height * 0.18))

  debris.forEach((element, index) => {
    const rect = rects[index]
    const startX = rect.left + rect.width / 2
    const startY = rect.top + rect.height / 2
    // 指數越大越集中在底部，看起來像是被重力壓實的一堆
    const depth = Math.pow(Math.random(), 2.1)
    const landX = random(6, viewport.width - 6)
    const landY = groundY - depth * bandHeight

    element.classList.add('boom-char--debris')
    element.style.setProperty('--dx', `${(landX - startX).toFixed(1)}px`)
    element.style.setProperty('--dy', `${(landY - startY).toFixed(1)}px`)
    element.style.setProperty('--rot', `${random(-80, 80).toFixed(0)}deg`)
    element.style.setProperty('--delay', `${random(0, 260).toFixed(0)}ms`)
    element.style.setProperty('--dur', `${random(950, 1500).toFixed(0)}ms`)
    element.style.setProperty('--rest', random(0.6, 1).toFixed(2))
  })

  return { chars: chars.length, debris: debris.length }
}

/** 卡片、按鈕、圖片等「格子」整塊掉落 */
function shatterPieces(scope) {
  const pieces = [...scope.querySelectorAll(PIECE_SELECTOR)].filter(
    // 還沒進場（.reveal 但沒有 is-visible）的元素本來就是透明的，不要讓它們跳出來
    (element) => !element.classList.contains('reveal') || element.classList.contains('is-visible'),
  )
  pieces.forEach((piece) => {
    piece.classList.add('boom-piece')
    setMotion(piece, { spin: 1.6, delayMax: 340, durMin: 1300, durMax: 2600 })
  })
  return pieces.length
}

/** 讓複製畫面中的 sticky 元素停在它原本被固定住的位置 */
function pinStickyElements(original, clone, scrollY) {
  const originalElements = [...original.querySelectorAll('*')]
  const clonedElements = [...clone.querySelectorAll('*')]

  originalElements.forEach((element, index) => {
    if (getComputedStyle(element).position !== 'sticky') return
    const target = clonedElements[index]
    if (!target) return

    const rect = element.getBoundingClientRect()
    const delta = rect.top + scrollY - element.offsetTop
    if (Math.abs(delta) < 1) return
    target.style.position = 'relative'
    target.style.top = `${delta.toFixed(1)}px`
  })
}

function buildPanel({ fragments, debris, onRestore }) {
  const panel = document.createElement('div')
  panel.className = 'boom-panel'
  panel.setAttribute('role', 'dialog')
  panel.setAttribute('aria-modal', 'true')
  panel.setAttribute('aria-label', '網頁已爆破')

  const title = document.createElement('p')
  title.className = 'boom-panel__title'
  title.textContent = '💥 網頁被爆破了'

  const text = document.createElement('p')
  text.className = 'boom-panel__text'
  text.textContent = fragments
    ? `炸出 ${fragments.toLocaleString('en-US')} 個碎片，地上留下 ${debris.toLocaleString('en-US')} 塊殘骸。別擔心，這只是特效，網站的資料一個字都沒少。`
    : '已依你系統的「減少動態效果」設定簡化特效。別擔心，網站的資料一個字都沒少。'

  const actions = document.createElement('div')
  actions.className = 'boom-panel__actions'

  const restore = document.createElement('button')
  restore.type = 'button'
  restore.className = 'btn btn--primary'
  restore.textContent = '重新組裝'
  restore.addEventListener('click', onRestore)
  restore.dataset.autofocus = 'true'

  const home = document.createElement('a')
  home.className = 'btn btn--outline'
  home.href = '#home'
  home.textContent = '回到首頁'
  home.addEventListener('click', onRestore)

  actions.append(restore, home)
  panel.append(title, text, actions)
  return panel
}

/**
 * 執行爆破特效。
 * @param {{ root: HTMLElement|null, onRestore?: () => void }} options
 * @returns {{ restore: () => void }}
 */
export function explodePage({ root, onRestore }) {
  if (!root) return { restore: () => {} }

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const scrollY = window.scrollY
  const layoutWidth = document.documentElement.clientWidth

  const layer = document.createElement('div')
  layer.className = 'boom-layer'
  layer.setAttribute('aria-hidden', 'true')

  const stage = document.createElement('div')
  stage.className = 'boom-stage'
  stage.style.width = `${layoutWidth}px`
  stage.style.transform = `translateY(${-scrollY}px)`

  const clone = root.cloneNode(true)
  clone.removeAttribute('id')
  clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))
  stage.appendChild(clone)
  layer.appendChild(stage)

  const flash = document.createElement('div')
  flash.className = 'boom-flash'
  layer.appendChild(flash)

  document.body.appendChild(layer)
  pinStickyElements(root, clone, scrollY)

  let fragments = 0
  let debris = 0
  if (!reducedMotion) {
    // 先標記會整塊掉落的「格子」，再拆字：
    // 這樣拆字時才知道哪些字在卡片裡面（那些字必須跟著卡片飛走，不能留下來當殘骸）
    const pieces = shatterPieces(clone)
    const textResult = shatterText(clone, { width: layoutWidth, height: window.innerHeight })
    fragments = textResult.chars + pieces
    debris = textResult.debris
  } else {
    layer.classList.add('is-instant')
  }

  document.documentElement.classList.add('boom-locked')
  layer.classList.add('is-shaking')
  root.style.visibility = 'hidden'

  let restored = false
  const panelWrap = document.createElement('div')
  panelWrap.className = 'boom-panel-wrap'

  const restore = () => {
    if (restored) return
    restored = true
    document.removeEventListener('keydown', onKeyDown)
    layer.remove()
    panelWrap.remove()
    root.style.visibility = ''
    document.documentElement.classList.remove('boom-locked')
    onRestore?.()
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') restore()
  }
  document.addEventListener('keydown', onKeyDown)

  window.setTimeout(
    () => {
      if (restored) return
      layer.classList.add('is-settled')
      // 面板放在 aria-hidden 圖層之外，螢幕閱讀器才找得到「重新組裝」
      panelWrap.appendChild(buildPanel({ fragments, debris, onRestore: restore }))
      document.body.appendChild(panelWrap)
      panelWrap.querySelector('button')?.focus()
    },
    reducedMotion ? 200 : 2200,
  )

  return { restore }
}
