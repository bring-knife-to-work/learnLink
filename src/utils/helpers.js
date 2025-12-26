// 工具函数

/**
 * 防抖函数
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 格式化URL，确保以http://或https://开头
 */
export function formatUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

/**
 * 高亮搜索关键词
 */
export function highlightText(text, keyword) {
  if (!keyword || !text) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

