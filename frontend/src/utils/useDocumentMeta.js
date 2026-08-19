import { useEffect } from 'react'

/**
 * Custom Hook for Dynamic Page Title, Meta Description, OpenGraph, and Twitter Cards
 */
export default function useDocumentMeta({ title, description, image, url }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title.includes('Greenwood') ? title : `${title} — Greenwood Academy`
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, propertyName, value, isProperty = false) => {
      if (!value) return
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        if (isProperty) {
          element.setAttribute('property', propertyName)
        } else {
          element.setAttribute('name', propertyName)
        }
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }

    // 2. Standard Meta Description
    updateMetaTag('meta[name="description"]', 'description', description)

    // 3. OpenGraph Meta Tags
    updateMetaTag('meta[property="og:title"]', 'og:title', title, true)
    updateMetaTag('meta[property="og:description"]', 'og:description', description, true)
    if (image) updateMetaTag('meta[property="og:image"]', 'og:image', image, true)
    if (url) updateMetaTag('meta[property="og:url"]', 'og:url', url, true)

    // 4. Twitter Cards
    updateMetaTag('meta[name="twitter:title"]', 'twitter:title', title)
    updateMetaTag('meta[name="twitter:description"]', 'twitter:description', description)
    if (image) updateMetaTag('meta[name="twitter:image"]', 'twitter:image', image)
  }, [title, description, image, url])
}
