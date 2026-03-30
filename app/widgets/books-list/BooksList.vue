<script setup lang="ts">
import { useBookSearch } from '#entities/book/model/useBookSearch'

const { books, page, total, error, pending, setSubject, fetchBooks } = useBookSearch()

onMounted(async () => {
  setSubject('all')
  await fetchBooks()
})
</script>

<template>
  <div class="py-3">
    <div
      v-if="pending"
      class="text-slate-500"
    >
      Загрузка книг...
    </div>

    <div
      v-else-if="error"
      class="text-red-500"
    >
      {{ error }}
    </div>

    <div
      v-else-if="books.length"
      class="flex flex-col"
    >
      <div class="flex flex-wrap justify-center gap-4">
        <BookCard
          v-for="book in books"
          :key="book.key"
          :book="book"
        />
      </div>

      <BooksListPagination
        :current-page="page"
        :total-pages="total"
      />
    </div>

    <div
      v-else
      class="py-6 text-slate-500"
    >
      Произошла неизвестная ошибка!
    </div>
  </div>
</template>
