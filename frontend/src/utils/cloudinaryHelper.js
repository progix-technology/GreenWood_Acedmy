/**
 * Helper utility to optimize Cloudinary images with auto-format (f_auto) and auto-quality (q_auto),
 * plus optional width constraints for ultra-fast lazy loading.
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url || ''

  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    // Avoid duplicate transformation injection
    if (url.includes('/upload/f_auto,q_auto')) {
      return url
    }
    const widthParam = options.width ? `w_${options.width},` : ''
    const transform = `f_auto,q_auto,${widthParam}`.replace(/,$/, '')
    return url.replace('/upload/', `/upload/${transform}/`)
  }

  return url
}
