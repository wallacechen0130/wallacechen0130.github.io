# Computer Science Student Portfolio

資訊工程學生的個人作品集網站。以 **React + Vite** 打造，可以一鍵部署到 **GitHub Pages**，
所有個人資料、專案與技能都集中放在 `src/data/`，改資料不需要動到任何 UI 程式碼。

---

## 1. 專案介紹

這個網站是為了「申請資訊工程相關科系 / 展示個人作品」而設計的靜態作品集網站，包含：

- Hero 首頁（名字、身份、簡介、View Projects / GitHub 按鈕）
- About Me（自我介紹與快速資訊）
- Skills（技能卡片，不含沒有依據的等級評分）
- Projects（專案卡片 + 分類篩選）
- Portfolio（學校專題、報告、研究、實驗等文件）
- Learning Journey（C++ → 演算法 → APCS → Python → Unity → AI → 軟體開發 時間軸）
- Contact（GitHub、Email 與其他公開社群）

網站為純靜態網站（沒有後端、不需要資料庫），可完整部署在 GitHub Pages 的免費方案上。

> 尚未填寫的個人資料一律使用 `[YOUR_NAME]`、`[PROJECT_URL]` 這類 placeholder。
> 網站會自動偵測 placeholder，把它顯示成「未設定」樣式，因此部署後**不會出現連到不存在帳號的壞連結**。

---

## 2. Features

- **資料與畫面分離**：所有文字集中在 `src/data/`，改資料即可更新網站
- **內建網站後台**：打開 `#/admin` 就能用表單改內容，不用碰程式碼（見 [第 16 節](#16-網站後台線上編輯內容)）
- **瀏覽計數器**：頁尾顯示網站累積瀏覽次數（見 [第 17 節](#17-瀏覽計數器)）
- **Placeholder 保護**：連結還沒填時自動變成不可點擊的「未設定」狀態
- **完整響應式**：桌面 / 平板 / 手機三種版面，手機使用 hamburger 選單（不是把桌機版縮小）
- **Sticky Navbar + 捲動高亮**：以 IntersectionObserver 實作 scroll spy，附捲動進度條
- **克制動畫**：Hero 淡入、捲動進場、卡片 hover、圖片 hover，全部使用 CSS 與輕量 JS
- **效能導向**：沒有任何第三方 UI 套件、系統字體、圖片 lazy loading
- **Accessibility**：語意化標籤、skip link、focus 樣式、`aria-*` 屬性、`prefers-reduced-motion` 支援
- **SEO**：title / description / Open Graph / Twitter Card / favicon / robots.txt / sitemap.xml / JSON-LD
- **自動部署**：push 到 `main` 後由 GitHub Actions 自動 build 並部署
- **無 Router**：單頁式錨點導覽，不需要處理 SPA 重新整理 404 的問題

---

## 3. Tech Stack

| 類別 | 使用技術 |
| --- | --- |
| 框架 | React 19 |
| 建置工具 | Vite |
| 語言 | JavaScript (JSX) |
| 樣式 | 原生 CSS（CSS 變數 + 分檔管理） |
| 圖示 | 自己寫的 SVG 元件（零第三方 icon 套件） |
| Lint | ESLint（flat config） |
| 部署 | GitHub Actions + GitHub Pages |

---

## 4. Local Development

需要 Node.js 20 以上（建議 22）。

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（預設 http://localhost:5173）
npm run dev

# 檢查程式碼品質
npm run lint

# 產生正式版檔案（輸出到 dist/）
npm run build

# 本機預覽正式版
npm run preview
```

---

## 5. 專案結構

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # push 到 main 自動部署到 GitHub Pages
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── avatar.svg          # 大頭貼（換成自己的照片）
│       ├── og-image.svg        # 社群分享預覽圖
│       └── projects/           # 專案圖片
├── src/
│   ├── components/             # 可重複使用的元件（+ 各自的 CSS）
│   │   ├── Icon.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── PortfolioCard.jsx
│   │   ├── Reveal.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── SkillCard.jsx
│   │   ├── SmartLink.jsx
│   │   └── TimelineItem.jsx
│   ├── admin/                  # 網站後台（#/admin）
│   │   ├── AdminApp.jsx        # 後台主畫面（密碼 + token 驗證）
│   │   ├── fields.jsx          # 表單欄位元件
│   │   ├── github.js           # GitHub API 讀寫
│   │   └── schema.js           # 後台表單欄位定義
│   ├── data/                   # ★ 所有內容都在這裡
│   │   ├── profile.json        # 個人資料、About、聯絡連結
│   │   ├── projects.json       # 專案
│   │   ├── portfolio.json      # 學校專題 / 報告 / 研究 / 實驗
│   │   ├── skills.json         # 技能
│   │   ├── learning.json       # 學習歷程時間軸
│   │   ├── counter.js          # 瀏覽計數器設定
│   │   ├── navigation.js       # Navbar 選單
│   │   └── seo.js              # SEO / 網站網址設定
│   ├── hooks/
│   ├── lib/
│   ├── sections/               # 頁面上的每一區塊（+ 各自的 CSS）
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Learning.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── tokens.css          # 顏色 / 間距 / 字體等設計變數
│   │   ├── base.css            # reset、共用樣式、按鈕
│   │   └── animations.css      # 動畫
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── SETUP.md                    # 從建立 repo 到網站上線的完整步驟
└── README.md
```

---

## 6. 如何修改個人資料

> 最快的做法是直接用內建後台（見第 16 節），用手機或任何電腦打開
> `https://wallacechen0130.github.io/#/admin` 就能改，改完按儲存會自動重新部署。
> 下面的方法適合想直接改檔案、或想用 git 管理的情況。

打開 **`src/data/profile.json`**，把 placeholder 換成你的資料：

```js
export const profile = {
  name: '王小明',                                     // Hero 主標、Navbar、SEO 標題
  roleEn: 'Computer Science Student & Developer',     // 英文職稱
  role: '資訊工程學生 / 開發者',                       // 中文職稱
  tagline: '一句話介紹自己。',
  avatar: 'images/avatar.svg',                        // 換成 images/my-photo.jpg
  email: 'you@example.com',
  location: 'Taipei, Taiwan',
  // ...
}
```

其他常改的欄位：

| 想改什麼 | 改哪裡 |
| --- | --- |
| 名字、簡介、大頭貼、Email、所在地 | `src/data/profile.json` |
| About Me 段落、快速資訊 | `src/data/profile.json` → `about` |
| GitHub / Telegram / Discord 連結 | `src/data/profile.json` → `links` |
| Hero 右上角的程式碼卡片 | `src/data/profile.json` → `codeCard` |
| 網站網址（sitemap） | `src/data/seo.js` → `url` |
| Navbar 選單文字與順序 | `src/data/navigation.js` |
| 瀏覽計數器開關 | `src/data/counter.js` |
| 全站配色 | `src/styles/tokens.css` |

### 社群連結開關

`links` 裡每個項目都有 `enabled` 欄位：

```js
{
  id: 'telegram',
  href: 'https://t.me/your_account',
  handle: '@your_account',
  enabled: false,   // 改成 true 才會出現在網站上
}
```

### 替換大頭貼

1. 把照片放進 `public/images/`（例如 `public/images/avatar.jpg`）
2. 修改 `profile.avatar` 為 `'images/avatar.jpg'`
3. 建議使用正方形圖片，並壓縮到 300KB 以內

---

## 7. 如何新增 Project

打開 **`src/data/projects.json`**，複製一個物件並修改：

```js
{
  id: 'my-new-project',            // 唯一值，不能重複
  title: 'My New Project',
  category: 'AI',                  // 會自動變成篩選按鈕
  featured: true,                  // 選填：在桌面版佔兩欄（建議整個網站只設定一張）
  summary: '一句話說明這個專案在做什麼。',
  highlights: ['重點一', '重點二'],  // 選填
  technologies: ['Python', 'LLM API'],
  image: 'images/projects/my-new-project.png',
  imageAlt: '專案截圖說明',
  links: {
    repo: 'https://github.com/your-name/my-new-project',
    demo: 'https://your-demo-url.com',   // 沒有 demo 就填 null
  },
}
```

新增圖片：把截圖放進 `public/images/projects/`。
建議尺寸 **1200 × 750（16:10）**、PNG 或 JPG、300KB 以內。

新增 `category` 時不用改任何程式碼，篩選按鈕會自動出現。

---

## 8. 如何新增 Portfolio 作品

打開 **`src/data/portfolio.json`**：

```js
{
  id: 'my-report',
  title: '我的專題報告',
  category: 'Reports',           // 必須是 portfolioCategories 中的其中一個
  type: 'pdf',                   // github | pdf | image | report | research | experiment | link
  sample: false,                 // 自己的作品請設為 false，才不會顯示「範例」標記
  description: '這份報告在講什麼。',
  tags: ['AI', 'LLM'],
  date: null,                    // 例如 '2025-06'
  url: 'https://drive.google.com/...',
}
```

要新增分類時，同時修改同一個檔案上方的 `portfolioCategories` 陣列即可。

**支援的連結型態**：Google Drive PDF、Notion 頁面、GitHub repo、YouTube、圖片網址都可以直接貼在 `url`。

---

## 9. 如何新增技能

打開 `src/data/skills.json`，在對應的群組 `items` 裡新增：

```js
{
  id: 'go',
  name: 'Go',
  icon: 'code',        // 可用名稱請看 src/components/Icon.jsx
  description: '用來寫後端服務與 CLI 工具。',
}
```

技能刻意**不設計等級或百分比**，避免出現沒有依據的自我評分。

---

## 10. 如何新增學習歷程

打開 `src/data/learning.json`，新增或修改陣列中的項目：

```js
{
  id: 'advanced-cpp',
  title: 'Advanced C++',
  period: '2025',      // 沒有明確時間就填 null，網站會自動隱藏時間標籤
  description: '這階段學了什麼。',
  tags: ['C++', 'STL'],
}
```

顯示順序就是陣列順序，把項目往上或往下搬即可調整。

---

## 11. GitHub Pages 部署

詳細的圖文步驟請看 **[SETUP.md](./SETUP.md)**，這裡只列重點：

1. 建立 GitHub repository，把這個專案 push 到 `main` 分支
2. 到 repo 的 **Settings → Pages**，把 **Source** 設為 **GitHub Actions**
3. push 之後，`.github/workflows/deploy.yml` 會自動：
   - `npm ci`
   - `npm run build`
   - 上傳 `dist/` 並部署到 GitHub Pages
4. 到 repo 的 **Actions** 頁籤可以看到部署進度，完成後 Pages 網址就會生效

### Base path 怎麼處理的？

`vite.config.js` 從環境變數 `VITE_BASE` 讀取 base path，而 workflow 會依照 repo 名稱自動判斷：

| Repo 名稱 | Base path | 網站網址 |
| --- | --- | --- |
| `你的帳號.github.io` | `/` | `https://你的帳號.github.io/` |
| `portfolio` | `/portfolio/` | `https://你的帳號.github.io/portfolio/` |

**你不需要手動修改任何設定**，換 repo 名稱也會自動跟著正確。

`npm run build` 也會自動產生 `robots.txt`、`sitemap.xml`、`404.html` 與 `.nojekyll`。

---

## 12. GitHub Repository 要設定什麼

只需要兩件事：

1. **Settings → Pages → Source** 選 **GitHub Actions**（不要選 Deploy from a branch）
2. 確認 **Settings → Actions → General → Workflow permissions** 至少有讀取權限
   （本專案在 workflow 內已宣告 `pages: write` 與 `id-token: write`，通常不需要額外設定）

Repository 可以是 **Public**（免費帳號需要 Public 才能使用 Pages）或 Private（依方案而定）。

---

## 13. GitHub Pages URL 格式

| 類型 | 網址格式 | 說明 |
| --- | --- | --- |
| 使用者網站 | `https://<username>.github.io/` | repo 名稱必須是 `<username>.github.io` |
| 專案網站 | `https://<username>.github.io/<repo-name>/` | 其他任何 repo 名稱 |

例如帳號是 `wallas`、repo 名稱是 `portfolio`，網址就是：

```
https://wallas.github.io/portfolio/
```

第一次部署後如果出現 404，請先確認 **Settings → Pages** 已經選了 GitHub Actions，並等 Actions 跑完。

---

## 14. 綁定自己的網域（Custom Domain）

1. 在網域商（Cloudflare、GoDaddy…）新增 DNS 記錄：

   | 類型 | 名稱 | 值 |
   | --- | --- | --- |
   | CNAME | `www` | `<username>.github.io` |
   | A | `@` | `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153` |

2. 到 repo 的 **Settings → Pages → Custom domain** 填入你的網域並儲存
   （GitHub 會自動在 `main` 分支加入 `CNAME` 檔案）
3. 勾選 **Enforce HTTPS**（憑證簽發需要幾分鐘到數小時）
4. 修改 `src/data/seo.js` 的 `url` 為你的網域，例如 `https://your-domain.com`
   （這樣 sitemap 與分享預覽才會是正確的網址）

> 使用自訂網域時，網站是放在網域根目錄，因此 base path 要是 `/`。
> 如果 workflow 偵測到的 base 不是 `/`，在 repo 設定 **Variable** `VITE_BASE=/`，
> 或在 `.github/workflows/deploy.yml` 的 build step 直接把 `VITE_BASE` 改成 `/`。

---

## 15. 常見問題

**Q：部署後圖片破圖。**
確認圖片放在 `public/images/...`，而且在資料檔裡的路徑**不要**以 `/` 開頭（用 `images/xxx.png`，不是 `/images/xxx.png`）。

**Q：改了資料但網站沒更新。**
GitHub Pages 有快取，等 1～2 分鐘後強制重新整理（Ctrl / Cmd + Shift + R）。

**Q：出現「未設定」而不是連結。**
代表那個欄位還是 `[YOUR_XXX]` / `[PROJECT_URL]` placeholder，到對應的 `src/data/*.js` 填上真實網址即可。

**Q：想換掉社群分享預覽圖。**
準備一張 1200 × 630 的 PNG，放進 `public/images/`，再修改 `src/data/seo.js` 的 `ogImage` 為 `'images/og-image.png'`。

**Q：想改整體配色。**
改 `src/styles/tokens.css` 最上方的 `--color-primary` 等變數，全站會一起更新。

---

## 16. 網站後台（線上編輯內容）

網址：**<https://wallacechen0130.github.io/#/admin>**

這個網站沒有後端伺服器，後台是用 **GitHub API** 直接把你編輯的內容寫回 repo，
存檔後 GitHub Actions 會自動重新部署，大約 1～2 分鐘後網站就會更新。

### 第一次使用

1. 打開後台網址，輸入**後台密碼**
2. 依畫面指示產生一組 GitHub token：
   - Repository access 選 **Only select repositories** → `wallacechen0130.github.io`
   - Permissions → Repository permissions → **Contents: Read and write**
3. 把 `github_pat_…` 貼進欄位，按「驗證並進入編輯」
4. 想省麻煩可以勾「記住這個瀏覽器」，之後就不用再貼

### 可以編輯什麼

| 分頁 | 內容 |
| --- | --- |
| 個人資料 | 姓名、職稱、簡介、大頭貼、Email、所在地、About、聯絡連結 |
| 專案 | 新增／刪除／排序專案卡片，上傳專案圖片 |
| 技能 | 技能分類與技能卡片 |
| 作品集 | 學校專題、報告、研究、實驗 |
| 學習歷程 | 時間軸階段 |

每一頁右上角都有「原始 JSON」，如果表單沒涵蓋到的欄位，可以直接改 JSON。

### 安全性說明（重要）

- **密碼只是防止誤闖的門檻**。網站是靜態的，密碼檢查在瀏覽器裡執行，
  看得懂程式碼的人可以繞過它，所以不要把密碼當成真正的保護。
- **真正保護資料的是 GitHub token**：沒有 token 的人就算進到後台，也無法寫入任何東西。
- token 只存在你自己的瀏覽器（localStorage），不會上傳到任何地方。
  在共用電腦用完請按右上角「登出」清除。
- 建議使用 **Fine-grained token**（只給這一個 repo 的 Contents 權限），
  不要用有全部 repo 權限的 classic token。
- 如果要換密碼：算出新密碼的 SHA-256，取代 `src/admin/AdminApp.jsx` 裡的 `PASSWORD_HASH`。
  指令：`node -e "console.log(require('crypto').createHash('sha256').update('新密碼').digest('hex'))"`

---

## 17. 瀏覽計數器

頁尾會顯示網站的累積瀏覽次數。因為是靜態網站，數字是透過免費的
[Abacus](https://abacus.jasoncameron.dev) 服務計算（不用註冊）：
每次有人開啟網站，瀏覽器會呼叫一次 API 讓計數 +1。

- 同一個瀏覽器「工作階段」只會算一次，重新整理不會重複累加
- 服務連不上時計數器會自動隱藏，不影響網站其他部分
- 後台（`#/admin`）只會讀取數字，不會把自己的瀏覽算進去
- 設定檔：`src/data/counter.js`
  - `enabled: false` 可以整個關掉
  - 改 `namespace` 或 `key` 會從 0 重新開始計算
  - 想換成自己的服務（例如 Cloudflare Worker），改 `endpoint` 即可，
    只要該服務回傳 `{"value": 數字}` 的 JSON 格式

> 隱私提醒：這個請求會讓 Abacus 看到訪客的 IP。如果你的網站需要更嚴格的隱私，
> 可以把 `enabled` 設為 `false`，改用 Cloudflare Web Analytics 之類的服務。

---

## 18. 授權

程式碼可自由用於個人作品集。網站中的文字、圖片與個人資料請自行替換為自己的內容。
