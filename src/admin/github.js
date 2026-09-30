// GitHub API 客戶端（後台用）
//
// 這個網站沒有後端伺服器：後台直接呼叫 GitHub 的 REST API，
// 把編輯後的內容 commit 回 repo，GitHub Actions 再自動重新部署。
//
// 需要一組有這個 repo「Contents: Read and write」權限的 token。
// token 只會存在你自己的瀏覽器（localStorage），不會傳到其他地方。

const API = 'https://api.github.com'
const TOKEN_KEY = 'portfolio-admin-token'

export const repoInfo = {
  owner: 'wallacechen0130',
  repo: 'wallacechen0130.github.io',
  branch: 'main',
}

repoInfo.fullName = `${repoInfo.owner}/${repoInfo.repo}`

/** 產生新 token 的頁面（已帶入建議的權限設定） */
export const newTokenUrl =
  'https://github.com/settings/personal-access-tokens/new' +
  '?name=portfolio-admin&description=Portfolio%20web%20admin' +
  `&target_name=${repoInfo.owner}` +
  '&contents=write&metadata=read'

export const actionsUrl = `https://github.com/${repoInfo.fullName}/actions`

export function loadToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function saveToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    /* 無痕模式可能無法寫入，忽略 */
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* 忽略 */
  }
}

function baseHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

async function readErrorMessage(response) {
  try {
    const body = await response.json()
    return body?.message || ''
  } catch {
    return ''
  }
}

async function apiFetch(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...baseHeaders(token), ...(options.headers || {}) },
  })

  if (!response.ok) {
    const detail = await readErrorMessage(response)
    const error = new Error(detail || `GitHub API 回應 ${response.status}`)
    error.status = response.status
    throw error
  }

  return response.status === 204 ? null : response.json()
}

function decodeBase64Utf8(base64) {
  const binary = atob(base64.replace(/\s/g, ''))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

function encodeBase64Utf8(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

/** 確認 token 有效，並回傳帳號與這個 repo 的權限 */
export async function verifyToken(token) {
  const user = await apiFetch(`${API}/user`, token)
  let canPush = false
  let repoError = ''

  try {
    const repo = await apiFetch(`${API}/repos/${repoInfo.fullName}`, token)
    canPush = Boolean(repo.permissions?.push)
  } catch (error) {
    repoError = error.message
  }

  return { login: user.login, name: user.name, canPush, repoError }
}

/** 讀取 repo 裡的 JSON 檔（不存在時回傳 data: null） */
export async function readJsonFile(path, token) {
  const url = `${API}/repos/${repoInfo.fullName}/contents/${path}?ref=${repoInfo.branch}`
  const response = await fetch(url, { headers: baseHeaders(token) })

  if (response.status === 404) return { data: null, sha: null }

  if (!response.ok) {
    const detail = await readErrorMessage(response)
    const error = new Error(detail || `讀取 ${path} 失敗（${response.status}）`)
    error.status = response.status
    throw error
  }

  const body = await response.json()
  return { data: JSON.parse(decodeBase64Utf8(body.content)), sha: body.sha }
}

/** 把 JSON 內容寫回 repo */
export async function writeJsonFile({ path, data, sha, message, token }) {
  const payload = {
    message,
    branch: repoInfo.branch,
    content: encodeBase64Utf8(`${JSON.stringify(data, null, 2)}\n`),
  }
  if (sha) payload.sha = sha

  const result = await apiFetch(`${API}/repos/${repoInfo.fullName}/contents/${path}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  return { sha: result?.content?.sha ?? null, commit: result?.commit?.sha ?? null }
}

/** 上傳圖片到 public/images/uploads/，回傳可以直接寫進資料裡的路徑 */
export async function uploadImage(file, token) {
  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''
  const chunkSize = 0x8000
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
  }

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
  const path = `public/images/uploads/${Date.now()}-${safeName}`

  await apiFetch(`${API}/repos/${repoInfo.fullName}/contents/${path}`, token, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Upload ${safeName} from web admin`,
      branch: repoInfo.branch,
      content: btoa(binary),
    }),
  })

  return path.replace(/^public\//, '')
}
