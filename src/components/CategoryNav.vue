<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-3">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        class="category-btn"
        :class="{ 'active': selectedCategory === category.id }"
      >
        <span class="mr-2 icon-emoji icon-emoji-sm">{{ category.icon }}</span>
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryNav',
  props: {
    categories: {
      type: Array,
      required: true
    },
    selectedCategory: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.$emit('category-change', categoryId)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  background: white;
  color: #374151;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:not(.active) {
    &:hover {
      border-color: rgba(128, 128, 192, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background: #f9fafb;
    }
  }

  &.active {
    background: linear-gradient(135deg, #8080C0, #6366f1) !important;
    color: white !important;
    box-shadow: 0 4px 12px rgba(128, 128, 192, 0.3);
    border-color: transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(128, 128, 192, 0.4);
    }
  }
}
</style>

