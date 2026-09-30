# SETUP — 從建立 GitHub Repository 到網站成功上線

這份文件把「完全沒有 repo」到「網站出現在 GitHub Pages」的每一步都寫出來。
照著做就好，不需要先懂 Git 或 GitHub Actions。

預估時間：**15 ～ 25 分鐘**（大部分時間是在等 GitHub Actions 跑完）。

---

## 目錄

1. [事前準備](#1-事前準備)
2. [Step 1：先在本機確認網站可以跑](#step-1先在本機確認網站可以跑)
3. [Step 2：建立 GitHub Repository](#step-2建立-github-repository)
4. [Step 3：把專案上傳到 GitHub](#step-3把專案上傳到-github)
5. [Step 4：開啟 GitHub Pages](#step-4開啟-github-pages)
6. [Step 5：等待自動部署完成](#step-5等待自動部署完成)
7. [Step 6：打開你的網站](#step-6打開你的網站)
8. [Step 7：之後怎麼更新網站](#step-7之後怎麼更新網站)
9. [Step 8（選用）：綁定自己的網域](#step-8選用綁定自己的網域)
10. [疑難排解](#疑難排解)

---

## 1. 事前準備

需要三樣東西：

| 項目 | 怎麼確認 |
| --- | --- |
| GitHub 帳號 | 到 [github.com](https://github.com) 註冊或登入 |
| Git | 終端機輸入 `git --version`，要有版本號 |
| Node.js 20 以上 | 終端機輸入 `node -v`，建議 v22 或 v24 |

沒裝 Git 或 Node.js 的話：

- Git：<https://git-scm.com/downloads>
- Node.js：<https://nodejs.org/>（下載 LTS 版本）

裝完請**重新開啟終端機**，再確認一次版本。

---

## Step 1：先在本機確認網站可以跑

打開終端機，切換到專案資料夾（就是有 `package.json` 的那一層）：

```bash
cd 你的路徑/portfolio
```

安裝依賴並啟動開發伺服器：

```bash
npm install
npm run dev
```

終端機會顯示一行像這樣的網址：

```
➜  Local:   http://localhost:5173/
```

用瀏覽器打開它，應該會看到完整的作品集網站。
確認畫面正常後，回到終端機按 **Ctrl + C** 關閉伺服器。

> 這一步不是必要的，但先確認本機可以跑，之後排查問題會簡單很多。

也可以順便檢查正式版建置沒有錯誤：

```bash
npm run build
```

成功的話會出現 `✓ built in ...`，並產生 `dist/` 資料夾。

---

## Step 2：建立 GitHub Repository

1. 登入 GitHub，點右上角的 **＋** → **New repository**
2. 填寫：

   | 欄位 | 建議值 | 說明 |
   | --- | --- | --- |
   | Repository name | `portfolio` | 想用的名稱都可以，會影響網址 |
   | Description | 選填 | 例如「Personal portfolio website」 |
   | Public / Private | **Public** | 免費帳號的 GitHub Pages 需要 Public |

3. **不要**勾選 Add a README file、Add .gitignore、Choose a license
   （這個專案已經有這些檔案，勾了會造成衝突）
4. 點 **Create repository**

建立完成後，頁面會顯示一串 Git 指令，先不要關掉，下一步會用到。

### 關於 repo 名稱的建議

| Repo 名稱 | 網站網址 | 說明 |
| --- | --- | --- |
| `<你的帳號>.github.io` | `https://<你的帳號>.github.io/` | 網址最短，但一個帳號只能有一個 |
| `portfolio` | `https://<你的帳號>.github.io/portfolio/` | 一般情況建議用這個 |

> 本專案會自動依照 repo 名稱計算正確的 base path，所以你**不需要修改任何設定檔**。

---

## Step 3：把專案上傳到 GitHub

在專案資料夾（有 `package.json` 的那一層）開啟終端機，依序執行：

```bash
# 1. 初始化 Git（如果還沒初始化過）
git init

# 2. 設定主要分支名稱
git branch -M main

# 3. 加入所有檔案
git add .

# 4. 建立第一個 commit
git commit -m "Initial commit: portfolio website"

# 5. 連接到你剛建立的 repo（把網址換成你自己的）
git remote add origin https://github.com/你的帳號/portfolio.git

# 6. 推上去
git push -u origin main
```

### 如果 repo 已經存在、也有內容

```bash
git remote add origin https://github.com/你的帳號/portfolio.git
git pull --rebase origin main
git push -u origin main
```

### 關於資料夾位置（重要）

這個 workflow 兩種情況都支援：

| 你的 repo 結構 | 說明 |
| --- | --- |
| repo 根目錄直接是 `package.json`、`src/`、`index.html` | 最常見，直接照上面的指令即可 |
| repo 根目錄下有一層 `portfolio/` 子資料夾 | workflow 會自動偵測並切換目錄 |

第一種情況（把專案內容直接放 repo 根目錄）比較單純，建議這樣做。

### 確認 `package-lock.json` 有被上傳

GitHub Actions 使用 `npm ci`，**必須**要有 `package-lock.json`。
執行 `npm install` 後這個檔案會自動產生，`git add .` 會一起加入。

可以用這個指令確認：

```bash
git ls-files | findstr package-lock
```

---

## Step 4：開啟 GitHub Pages

1. 進入你的 repo 頁面
2. 點上方的 **Settings**
3. 左側選單找到 **Pages**
4. 在 **Build and deployment** 區塊：
   - **Source** 選 **GitHub Actions**（不要選 Deploy from a branch）
5. 不用按儲存，選好就會自動生效

> **順序很重要**：請先完成這一步，再讓 workflow 部署。
> 如果 workflow 在 Pages 還沒開啟前就先跑過而失敗，到 **Actions** 頁籤點 **Re-run all jobs** 重跑即可。

---

## Step 5：等待自動部署完成

1. 回到 repo 頁面，點上方的 **Actions**
2. 會看到一個名為 **Deploy to GitHub Pages** 的 workflow 正在跑
3. 黃色圓點 = 進行中，綠色勾勾 = 成功，紅色叉叉 = 失敗

整個流程大約 1 ～ 3 分鐘，包含：

```
npm ci  →  npm run build  →  upload dist/  →  deploy to GitHub Pages
```

看到綠色勾勾就代表部署成功了。

---

## Step 6：打開你的網站

到 **Settings → Pages**，頁面上方會顯示：

```
Your site is live at https://你的帳號.github.io/portfolio/
```

點那個網址就會看到你的網站。

也可以從 **Actions** → 左側的 `deploy` job → 點擊 **github-pages** 環境的網址進入。

如果顯示 404，先等 1 ～ 2 分鐘重新整理，或參考下面的[疑難排解](#疑難排解)。

---

## Step 7：之後怎麼更新網站

改完資料或程式碼後，只要三個指令：

```bash
git add .
git commit -m "Update profile"
git push
```

push 到 `main` 之後，GitHub Actions 會**自動**重新建置與部署，不需要手動 build。

最常修改的檔案：

| 想改什麼 | 檔案 |
| --- | --- |
| 名字、簡介、Email、社群連結 | `src/data/profile.js` |
| 專案 | `src/data/projects.js` |
| 學校作品、報告 | `src/data/portfolio.js` |
| 技能 | `src/data/skills.js` |
| 學習歷程 | `src/data/learning.js` |
| 網站網址（sitemap 用） | `src/data/seo.js` |

---

## Step 8（選用）：綁定自己的網域

### 1. 在網域商設定 DNS

| 類型 | 名稱 | 值 |
| --- | --- | --- |
| CNAME | `www` | `<你的帳號>.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

（A 記錄四筆都要加）

### 2. 在 GitHub 設定

1. **Settings → Pages → Custom domain** 填入你的網域，例如 `portfolio.example.com`
2. 按 **Save**，GitHub 會自動建立 `CNAME` 檔案
3. 等 DNS 檢查通過後，勾選 **Enforce HTTPS**

### 3. 修改專案設定

自訂網域是放在網域根目錄，所以 base path 要是 `/`。

打開 `src/data/seo.js`，把 `url` 改成你的網域：

```js
export const seo = {
  url: 'https://portfolio.example.com',
  // ...
}
```

然後在 repo 加上一個 Actions Variable 讓 workflow 也用正確的 base：

**Settings → Secrets and variables → Actions → Variables → New repository variable**

```
Name:  VITE_BASE
Value: /
```

再到 `.github/workflows/deploy.yml` 的 build step，把 `VITE_BASE` 改成讀取這個 variable：

```yaml
        env:
          VITE_BASE: ${{ vars.VITE_BASE || steps.base.outputs.base }}
          VITE_SITE_URL: https://portfolio.example.com
```

（把 `VITE_SITE_URL` 也改成你的網域，sitemap 才會是正確的絕對網址。）

改完 commit 並 push，就會用新的網址重新部署。

---

## 疑難排解

### 網站顯示 404

依序檢查：

1. **Settings → Pages** 的 Source 是不是選了 **GitHub Actions**
2. **Actions** 頁籤的 workflow 是不是綠色勾勾（紅色要先修錯）
3. 網址是不是正確（專案網站一定要帶 repo 名稱：`/portfolio/`）
4. 剛部署完請等 1 ～ 2 分鐘，並用 Ctrl / Cmd + Shift + R 強制重新整理

### Actions 顯示紅色叉叉

點進去看是哪一個 step 失敗：

| 錯誤訊息 | 原因與解法 |
| --- | --- |
| `npm ci ... can only install with an existing package-lock.json` | `package-lock.json` 沒有 commit。本機執行 `npm install` 後 `git add package-lock.json` 再 push |
| `Get Pages site failed` / `Not Found` | Pages 還沒開啟。先完成 Step 4，再點 **Re-run all jobs** |
| `Resource not accessible by integration` | 到 **Settings → Actions → General → Workflow permissions** 改成 **Read and write permissions** |
| `vite: not found` / 找不到指令 | 依賴沒安裝成功，確認有 commit `package-lock.json` 且沒有把 `node_modules` 上傳 |

### 網站跑得起來，但圖片破圖

- 圖片要放在 `public/images/` 底下
- 資料檔裡的圖片路徑**不要以 `/` 開頭**：
  - 對：`images/projects/my-game.png`
  - 錯：`/images/projects/my-game.png`

### 部署成功但畫面是舊的

GitHub Pages 與瀏覽器都有快取，等 1 ～ 2 分鐘後用 Ctrl / Cmd + Shift + R 強制重新整理。
也可以到 **Actions** 確認最新一次 workflow 是執行在最新的 commit 上。

### 想確認本機建置沒問題

```bash
npm run lint     # 檢查程式碼
npm run build    # 確認可以建置
npm run preview  # 用本機預覽 dist/ 的正式版
```

---

完成以上步驟後，之後你只需要修改 `src/data/` 裡的資料、push 到 `main`，網站就會自動更新。
