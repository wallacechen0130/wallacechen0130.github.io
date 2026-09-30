import { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import VisitCounter from '../components/VisitCounter.jsx'
import { AdminContext } from './context.js'
import { FieldGroup } from './fields.jsx'
import {
  actionsUrl,
  clearToken,
  loadToken,
  newTokenUrl,
  readJsonFile,
  repoInfo,
  saveToken as persistToken,
  uploadImage,
  verifyToken,
  writeJsonFile,
} from './github.js'
import { schemas } from './schema.js'
import './admin.css'

// 後台密碼（只存 SHA-256 雜湊，網頁原始碼裡看不到明碼）
const PASSWORD_HASH = 'eedf26ecdb23502a9dfe7ecadfaccd5db6514e2caf034cc1c2a8252b02995db9'
const UNLOCK_KEY = 'portfolio-admin-unlocked'

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function readUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === 'yes'
  } catch {
    return false
  }
}

function storeUnlocked(value) {
  try {
    if (value) sessionStorage.setItem(UNLOCK_KEY, 'yes')
    else sessionStorage.removeItem(UNLOCK_KEY)
  } catch {
    /* 忽略 */
  }
}

/* ------------------------------------------------------------------ */

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (!crypto?.subtle) {
        setError('這個瀏覽器環境不支援加密功能，請改用 https 或 localhost 開啟。')
        return
      }
      const hash = await sha256Hex(value)
      if (hash === PASSWORD_HASH) {
        storeUnlocked(true)
        onUnlock()
      } else {
        setError('密碼錯誤')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin admin--centered">
      <form className="admin-card" onSubmit={submit}>
        <span className="admin-card__icon">
          <Icon name="lock" size={22} />
        </span>
        <h1 className="admin-card__title">網站後台</h1>
        <p className="admin-card__text">請輸入密碼後才能進入編輯畫面。</p>
        <label className="af-field">
          <span className="af-label">密碼</span>
          <input
            className="af-input"
            type="password"
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        {error ? <p className="af-error">{error}</p> : null}
        <button type="submit" className="af-btn af-btn--primary af-btn--block" disabled={busy}>
          {busy ? '檢查中…' : '進入後台'}
        </button>
        <p className="admin-card__note">
          提醒：密碼只是防止誤闖。真正保護你資料的是下一步要輸入的 GitHub token，
          沒有 token 的人在這裡什麼都改不了。
        </p>
      </form>
    </div>
  )
}

function TokenGate({ onReady }) {
  const [value, setValue] = useState(loadToken())
  const [remember, setRemember] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const token = value.trim()
    if (!token) {
      setError('請先貼上 token')
      return
    }
    setBusy(true)
    setError('')
    try {
      const session = await verifyToken(token)
      if (!session.canPush) {
        setError(
          `這個 token 沒有 ${repoInfo.fullName} 的寫入權限${session.repoError ? `（${session.repoError}）` : ''}。請確認 token 是給 ${repoInfo.owner}、且 Contents 權限設為 Read and write。`,
        )
        return
      }
      if (remember) persistToken(token)
      storeUnlocked(true)
      onReady(token, session)
    } catch (verifyError) {
      setError(
        verifyError.status === 401
          ? 'token 不正確或已失效，請重新產生一個。'
          : verifyError.message,
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin admin--centered">
      <form className="admin-card admin-card--wide" onSubmit={submit}>
        <span className="admin-card__icon">
          <Icon name="github" size={22} />
        </span>
        <h1 className="admin-card__title">連接 GitHub</h1>
        <p className="admin-card__text">
          這個後台沒有伺服器，是直接用 GitHub API 把內容寫回 repo
          <code>{repoInfo.fullName}</code>。需要一組只有這個 repo 權限的 token。
        </p>

        <ol className="admin-steps">
          <li>
            點下面的按鈕開啟 GitHub 的 token 產生頁
            <a className="af-btn af-btn--small" href={newTokenUrl} target="_blank" rel="noreferrer">
              <Icon name="external-link" size={15} />
              產生 token
            </a>
          </li>
          <li>
            Repository access 選 <strong>Only select repositories</strong> → <code>{repoInfo.repo}</code>
          </li>
          <li>
            Permissions → Repository permissions → <strong>Contents</strong> 設為{' '}
            <strong>Read and write</strong>
          </li>
          <li>按 Generate token，複製 <code>github_pat_…</code> 貼到下面</li>
        </ol>

        <label className="af-field">
          <span className="af-label">Personal access token</span>
          <input
            className="af-input"
            type="password"
            placeholder="github_pat_..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label className="af-toggle">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span>記住這個瀏覽器（下次不用重貼）</span>
        </label>

        {error ? <p className="af-error">{error}</p> : null}

        <button type="submit" className="af-btn af-btn--primary af-btn--block" disabled={busy}>
          {busy ? '驗證中…' : '驗證並進入編輯'}
        </button>
        <p className="admin-card__note">
          token 只會存在你目前這個瀏覽器的 localStorage，不會上傳到任何地方。
          在共用電腦上用完，記得按右上角「登出」清掉。
        </p>
      </form>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function AdminApp() {
  const [unlocked, setUnlocked] = useState(readUnlocked)
  const [token, setToken] = useState('')
  const [session, setSession] = useState(null)
  const [files, setFiles] = useState({})
  const [activeId, setActiveId] = useState(schemas[0].id)
  const [status, setStatus] = useState('idle')
  const [notice, setNotice] = useState(null)
  const [saving, setSaving] = useState(false)
  const [commitMessage, setCommitMessage] = useState('Update site content from admin')
  const [rawMode, setRawMode] = useState(false)
  const [rawText, setRawText] = useState('')
  const [rawError, setRawError] = useState('')

  const activeSchema = useMemo(
    () => schemas.find((schema) => schema.id === activeId) ?? schemas[0],
    [activeId],
  )

  useEffect(() => {
    document.title = '網站後台 | Portfolio'
    let meta = document.head.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', 'noindex, nofollow')
  }, [])

  const loadAll = useCallback(
    async (authToken) => {
      setStatus('loading')
      setNotice(null)
      try {
        const results = await Promise.all(
          schemas.map(async (schema) => {
            const { data, sha } = await readJsonFile(schema.path, authToken)
            return [schema.id, { data: data ?? {}, original: data ?? {}, sha }]
          }),
        )
        setFiles(Object.fromEntries(results))
        setStatus('ready')
      } catch (error) {
        setStatus('error')
        setNotice({ type: 'error', text: `讀取資料失敗：${error.message}` })
      }
    },
    [],
  )

  useEffect(() => {
    if (unlocked && token) loadAll(token)
  }, [unlocked, token, loadAll])

  // 上次已經驗證過就自動帶入 token
  useEffect(() => {
    if (!unlocked) return
    const stored = loadToken()
    if (stored && !token) setToken(stored)
  }, [unlocked, token])

  const entry = files[activeSchema.id]
  const isDirty = useCallback(
    (schemaId) => {
      const item = files[schemaId]
      if (!item?.data) return false
      return JSON.stringify(item.data) !== JSON.stringify(item.original)
    },
    [files],
  )
  const dirtyIds = schemas.filter((schema) => isDirty(schema.id)).map((schema) => schema.id)

  const updateActive = (nextData) => {
    setFiles((current) => ({
      ...current,
      [activeSchema.id]: { ...current[activeSchema.id], data: nextData },
    }))
  }

  const resetActive = () => {
    setFiles((current) => ({
      ...current,
      [activeSchema.id]: {
        ...current[activeSchema.id],
        data: structuredClone(current[activeSchema.id].original),
      },
    }))
    setNotice({ type: 'info', text: `已還原「${activeSchema.label}」尚未儲存的變更。` })
  }

  const handleUpload = useCallback(
    async (file) => {
      if (!token) throw new Error('尚未連接 GitHub')
      if (file.size > 4 * 1024 * 1024) throw new Error('圖片超過 4MB，請先壓縮再上傳')
      return uploadImage(file, token)
    },
    [token],
  )

  const handleSave = async () => {
    if (!dirtyIds.length) return
    setSaving(true)
    setNotice(null)
    try {
      const results = []
      for (const schemaId of dirtyIds) {
        const schema = schemas.find((item) => item.id === schemaId)
        const item = files[schemaId]
        const result = await writeJsonFile({
          path: schema.path,
          data: item.data,
          sha: item.sha,
          message: commitMessage.trim() || 'Update site content from admin',
          token,
        })
        results.push(result)
        setFiles((current) => ({
          ...current,
          [schemaId]: { data: item.data, original: structuredClone(item.data), sha: result.sha },
        }))
      }
      setNotice({
        type: 'success',
        text: `已儲存 ${results.length} 個檔案（commit ${results[0]?.commit?.slice(0, 7) ?? ''}）。GitHub Actions 大約 1～2 分鐘後會完成部署。`,
      })
    } catch (error) {
      setNotice({
        type: 'error',
        text:
          error.status === 409
            ? '檔案在你編輯期間被改動過，請重新整理後再試一次。'
            : `儲存失敗：${error.message}`,
      })
    } finally {
      setSaving(false)
    }
  }

  const openRaw = () => {
    setRawText(JSON.stringify(entry?.data ?? {}, null, 2))
    setRawError('')
    setRawMode(true)
  }

  const applyRaw = () => {
    try {
      const parsed = JSON.parse(rawText)
      updateActive(parsed)
      setRawError('')
      setRawMode(false)
      setNotice({ type: 'info', text: '已套用 JSON 內容，記得按儲存才會寫回 GitHub。' })
    } catch (error) {
      setRawError(`JSON 格式錯誤：${error.message}`)
    }
  }

  const logout = () => {
    clearToken()
    storeUnlocked(false)
    setToken('')
    setSession(null)
    setFiles({})
    setUnlocked(false)
    setStatus('idle')
  }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />
  if (!token || !session) {
    return (
      <TokenGate
        onReady={(nextToken, nextSession) => {
          setToken(nextToken)
          setSession(nextSession)
        }}
      />
    )
  }

  return (
    <AdminContext.Provider value={{ token, onUpload: handleUpload }}>
      <div className="admin">
        <header className="admin-bar">
          <div className="admin-bar__left">
            <a className="admin-bar__back" href="#home" title="回到網站">
              <Icon name="arrow-right" size={16} />
            </a>
            <div>
              <p className="admin-bar__title">網站後台</p>
              <p className="admin-bar__sub">
                {repoInfo.fullName} · {repoInfo.branch} · {session.login}
              </p>
            </div>
          </div>
          <div className="admin-bar__right">
            <a className="af-btn af-btn--small" href="./" target="_blank" rel="noreferrer">
              查看網站
            </a>
            <a className="af-btn af-btn--small" href={actionsUrl} target="_blank" rel="noreferrer">
              部署狀態
            </a>
            <button type="button" className="af-btn af-btn--small" onClick={logout}>
              登出
            </button>
          </div>
        </header>

        <nav className="admin-tabs" aria-label="編輯項目">
          {schemas.map((schema) => (
            <button
              key={schema.id}
              type="button"
              className={`admin-tab${schema.id === activeId ? ' is-active' : ''}`}
              onClick={() => {
                setActiveId(schema.id)
                setRawMode(false)
              }}
            >
              <Icon name={schema.icon} size={16} />
              {schema.label}
              {isDirty(schema.id) ? <span className="admin-tab__dot" aria-label="尚未儲存" /> : null}
            </button>
          ))}
          <span className="admin-tabs__spacer" />
          <VisitCounter readOnly className="admin-tabs__counter" />
        </nav>

        <main className="admin-body">
          <div className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <h2 className="admin-panel__title">{activeSchema.label}</h2>
                <p className="admin-panel__hint">{activeSchema.hint}</p>
              </div>
              <div className="admin-panel__tools">
                <button
                  type="button"
                  className="af-btn af-btn--small"
                  onClick={rawMode ? () => setRawMode(false) : openRaw}
                >
                  {rawMode ? '回到表單' : '原始 JSON'}
                </button>
                <button
                  type="button"
                  className="af-btn af-btn--small"
                  disabled={!isDirty(activeSchema.id)}
                  onClick={resetActive}
                >
                  還原此頁
                </button>
              </div>
            </div>

            {status === 'loading' ? <p className="admin-loading">讀取資料中…</p> : null}

            {rawMode ? (
              <div className="admin-raw">
                <textarea
                  className="af-input admin-raw__area"
                  value={rawText}
                  spellCheck="false"
                  onChange={(event) => setRawText(event.target.value)}
                />
                {rawError ? <p className="af-error">{rawError}</p> : null}
                <button type="button" className="af-btn af-btn--primary" onClick={applyRaw}>
                  套用 JSON
                </button>
              </div>
            ) : entry?.data ? (
              <FieldGroup
                fields={activeSchema.fields}
                root={entry.data}
                path={[]}
                onChange={updateActive}
              />
            ) : null}
          </div>
        </main>

        <div className="admin-savebar">
          <div className="admin-savebar__info">
            {notice ? (
              <p className={`admin-notice admin-notice--${notice.type}`}>{notice.text}</p>
            ) : (
              <p className="admin-savebar__hint">
                {dirtyIds.length
                  ? `有 ${dirtyIds.length} 個檔案尚未儲存`
                  : '所有變更都已儲存，重新整理會讀到 GitHub 上的最新版本'}
              </p>
            )}
          </div>
          <div className="admin-savebar__actions">
            <label className="af-field af-field--inline">
              <span className="af-label">commit 訊息</span>
              <input
                className="af-input"
                type="text"
                value={commitMessage}
                onChange={(event) => setCommitMessage(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="af-btn af-btn--primary"
              disabled={!dirtyIds.length || saving}
              onClick={handleSave}
            >
              {saving ? '儲存中…' : `儲存並部署${dirtyIds.length ? `（${dirtyIds.length}）` : ''}`}
            </button>
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  )
}

