<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
    />
    <button
      v-if="value"
      @click="$emit('clear')"
      class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索网址、描述、标签...'
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  input {
    border: 2px solid #e5e7eb;
    transition: all 0.3s;

    &:focus {
      border-color: #8080C0;
      box-shadow: 0 0 0 3px rgba(128, 128, 192, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  svg {
    transition: color 0.3s;
  }

  button:hover svg {
    color: #8080C0;
  }
}
</style>

