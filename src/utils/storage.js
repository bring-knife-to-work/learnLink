// 本地存储工具函数

const STORAGE_KEY_FAVORITES = 'learnlink_favorites'
const STORAGE_KEY_VISIT_COUNT = 'learnlink_visit_count'

/**
 * 获取收藏列表
 */
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY_FAVORITES)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error('获取收藏列表失败:', error)
    return []
  }
}

/**
 * 保存收藏列表
 */
export function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites))
  } catch (error) {
    console.error('保存收藏列表失败:', error)
  }
}

/**
 * 添加收藏
 */
export function addFavorite(linkId) {
  const favorites = getFavorites()
  if (!favorites.includes(linkId)) {
    favorites.push(linkId)
    saveFavorites(favorites)
  }
  return favorites
}

/**
 * 移除收藏
 */
export function removeFavorite(linkId) {
  const favorites = getFavorites()
  const index = favorites.indexOf(linkId)
  if (index > -1) {
    favorites.splice(index, 1)
    saveFavorites(favorites)
  }
  return favorites
}

/**
 * 检查是否已收藏
 */
export function isFavorite(linkId) {
  const favorites = getFavorites()
  return favorites.includes(linkId)
}

/**
 * 获取访问统计
 */
export function getVisitCount() {
  try {
    const visitCount = localStorage.getItem(STORAGE_KEY_VISIT_COUNT)
    return visitCount ? JSON.parse(visitCount) : {}
  } catch (error) {
    console.error('获取访问统计失败:', error)
    return {}
  }
}

/**
 * 增加访问次数
 */
export function incrementVisitCount(linkId) {
  try {
    const visitCount = getVisitCount()
    visitCount[linkId] = (visitCount[linkId] || 0) + 1
    localStorage.setItem(STORAGE_KEY_VISIT_COUNT, JSON.stringify(visitCount))
    return visitCount[linkId]
  } catch (error) {
    console.error('更新访问统计失败:', error)
    return 0
  }
}

