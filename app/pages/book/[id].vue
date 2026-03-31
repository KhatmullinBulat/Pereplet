<script setup lang="ts">
import {
  getOpenLibraryCoverUrl,
  getOpenLibraryDescription,
  normalizeOpenLibraryWorkId,
  useBookApi,
} from '#entities/book'

const route = useRoute()
const bookApi = useBookApi()

const rawBookId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id

const bookId = normalizeOpenLibraryWorkId(typeof rawBookId === 'string' ? rawBookId : '')

const { data: book, pending, error } = bookApi.getOne({
  id: bookId,
  options: {
    immediate: Boolean(bookId),
  },
})

const coverUrl = computed(() => getOpenLibraryCoverUrl(book.value?.covers?.[0], 'L'))
const description = computed(() => getOpenLibraryDescription(book.value?.description))

useHead(() => ({
  title: book.value?.title ?? 'Book',
}))
</script>

<template>
  <div class="container mx-auto px-3 py-6">
    <div
      v-if="pending"
      class="text-slate-500"
    >
      Загрузка книги...
    </div>

    <div
      v-else-if="error"
      class="text-red-500"
    >
      Не удалось загрузить книгу
    </div>

    <article
      v-else-if="book"
      class="grid gap-6 md:grid-cols-[280px_1fr]"
    >
      <div class="overflow-hidden rounded-3xl bg-slate-100">
        <img
          v-if="coverUrl"
          :alt="book.title"
          class="aspect-3/4 h-full w-full"
          :src="coverUrl"
        >

        <div
          v-else
          class="flex aspect-3/4 items-center justify-center p-6 text-center text-sm text-slate-500"
        >
          Обложка недоступна
        </div>
      </div>

      <div class="space-y-4">
        <p class="text-sm text-slate-500">
          Work ID: {{ normalizeOpenLibraryWorkId(book.key) }}
        </p>

        <h1 class="text-3xl font-semibold text-slate-900">
          {{ book.title }}
        </h1>

        <p
          v-if="description"
          class="text-base leading-7 text-slate-700"
        >
          {{ description }}
        </p>

        <p
          v-else
          class="text-base text-slate-500"
        >
          В Open Library пока нет описания для этой книги.
        </p>

        <div
          v-if="book.subjects?.length"
          class="flex flex-wrap gap-2"
        >
          <span
            v-for="subject in book.subjects.slice(0, 10)"
            :key="subject"
            class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
          >
            {{ subject }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>
