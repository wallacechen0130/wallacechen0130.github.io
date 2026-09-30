import { createContext } from 'react'

/** 由 AdminApp 提供：token 與圖片上傳函式 */
export const AdminContext = createContext({ token: '', onUpload: null })
