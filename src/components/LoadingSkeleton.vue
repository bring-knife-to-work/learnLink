<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="n in count"
      :key="n"
      class="bg-white rounded-xl shadow-md p-6 animate-pulse"
    >
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>
      <div class="flex gap-2 mb-4">
        <div class="h-6 bg-gray-200 rounded-full w-16"></div>
        <div class="h-6 bg-gray-200 rounded-full w-20"></div>
        <div class="h-6 bg-gray-200 rounded-full w-14"></div>
      </div>
      <div class="h-px bg-gray-200 mb-4"></div>
      <div class="flex items-center justify-between">
        <div class="h-4 bg-gray-200 rounded w-20"></div>
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSkeleton',
  props: {
    count: {
      type: Number,
      default: 6
    }
  }
}
</script>

