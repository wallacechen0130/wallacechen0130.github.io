import { useEffect } from 'react'
import { profile } from '../data/profile.js'
import { seo } from '../data/seo.js'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

/**
 * 依資料檔內容更新 <title> 與社群分享用的 meta 標籤。
 * 標題格式：[YOUR_NAME] | Computer Science Student & Developer
 */
export default function useDocumentMeta() {
  useEffect(() => {
    const title = `${profile.name} | ${profile.roleEn}`

    document.title = title
    setMeta('name', 'description', seo.description)
    setMeta('name', 'author', profile.name)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', seo.description)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', seo.description)
  }, [])
}
