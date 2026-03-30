<script setup lang="ts">
import { BOOK_CATEGORIES } from '#shared/config/bookCategories'
</script>

<template>
  <div class="w-full px-6">
    <ul class="flex justify-between overflow-x-auto gap-4">
      <SearchByCategoryButton
        v-for="category in BOOK_CATEGORIES"
        :key="category.key"
        :category="category"
      />
    </ul>
  </div>
</template>
