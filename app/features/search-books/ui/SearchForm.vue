<script setup lang="ts">
import { useBookSearch } from '../../../entities/book/model/useBookSearch'

const { pending, query, submitSearch } = useBookSearch()

async function handleSubmit(e: Event) {
  e.preventDefault()
  await submitSearch()
}
</script>

<template>
  <form
    class="flex justify-end gap-4 w-full"
    @submit="handleSubmit"
  >
    <SearchInput v-model="query" />
    <SearchButton :disabled="pending" />
  </form>
</template>
