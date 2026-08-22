import { useEffect } from 'react'

/**
 * Comprehensive SEO Hook for Dynamic Page Title, Meta Description, Keywords, Robots, Canonical URL, OpenGraph, and Twitter Cards
 */
export default function useDocumentMeta({
  title,
  description,
  keywords,
  image,
  url,
  robots = 'index, follow',
  type = 'website'
} = {}) {
  useEffect(() => {
    // 1. Update Document Title
    const siteTitle = 'Greenwood Academy'
    if (title) {
      document.title = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`
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

    // 2. Standard Meta Description & Keywords
    if (description) {
      updateMetaTag('meta[name="description"]', 'description', description)
    }

    const defaultKeywords = 'Greenwood Academy, CBSE School Lucknow, Best School Gomti Nagar, Admissions 2026-27, STEM School Lucknow, Top Schools in Uttar Pradesh'
    updateMetaTag('meta[name="keywords"]', 'keywords', keywords || defaultKeywords)
    updateMetaTag('meta[name="robots"]', 'robots', robots)

    // 3. Dynamic Canonical URL
    const currentUrl = url || window.location.href
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', currentUrl)

    // 4. OpenGraph Meta Tags (Facebook, WhatsApp, LinkedIn)
    const effectiveTitle = title ? (title.includes(siteTitle) ? title : `${title} | ${siteTitle}`) : 'Greenwood Academy — Nurturing Excellence Since 1998'
    const effectiveDesc = description || 'CBSE Affiliated Senior Secondary School in Lucknow offering Nursery to Class 12 holistic education.'
    const effectiveImage = image || 'https://greenwoodacademy.edu.in/og-image.jpg'

    updateMetaTag('meta[property="og:site_name"]', 'og:site_name', siteTitle, true)
    updateMetaTag('meta[property="og:type"]', 'og:type', type, true)
    updateMetaTag('meta[property="og:url"]', 'og:url', currentUrl, true)
    updateMetaTag('meta[property="og:title"]', 'og:title', effectiveTitle, true)
    updateMetaTag('meta[property="og:description"]', 'og:description', effectiveDesc, true)
    updateMetaTag('meta[property="og:image"]', 'og:image', effectiveImage, true)

    // 5. Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image')
    updateMetaTag('meta[name="twitter:url"]', 'twitter:url', currentUrl)
    updateMetaTag('meta[name="twitter:title"]', 'twitter:title', effectiveTitle)
    updateMetaTag('meta[name="twitter:description"]', 'twitter:description', effectiveDesc)
    updateMetaTag('meta[name="twitter:image"]', 'twitter:image', effectiveImage)
  }, [title, description, keywords, image, url, robots, type])
}
