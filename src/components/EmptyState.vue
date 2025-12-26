<template>
  <div class="empty-state-container">
    <div class="empty-state-icon-wrapper">
      <div class="empty-state-icon">{{ icon }}</div>
    </div>
    <h3 class="empty-state-title">{{ title }}</h3>
    <p class="empty-state-message">{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    icon: {
      type: String,
      default: '📭'
    },
    title: {
      type: String,
      default: '暂无数据'
    },
    message: {
      type: String,
      default: '没有找到相关内容'
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-state-container {
  text-align: center;
  padding: 64px 16px;
}

.empty-state-icon-wrapper {
  margin: 0 auto 24px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state-icon {
  font-size: 40px !important;
  line-height: 1 !important;
  width: 64px !important;
  height: 64px !important;
  max-width: 64px !important;
  max-height: 64px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
  box-sizing: border-box !important;
  transform: scale(1) !important;
  transform-origin: center center !important;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.empty-state-message {
  color: #6b7280;
  max-width: 28rem;
  margin: 0 auto 24px;
  line-height: 1.6;
}
</style>

