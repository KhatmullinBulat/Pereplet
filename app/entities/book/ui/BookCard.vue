<script setup lang="ts">
import type { OpenLibrarySearchBook } from '../types/books.types'
import { getOpenLibraryCoverUrl } from '#entities/book'
import { normalizeOpenLibraryWorkId } from '../lib/openLibrary'

interface Props {
  book: OpenLibrarySearchBook
}

const props = defineProps<Props>()

const FALLBACK_COVER_URL = 'https://placehold.co/300x400?text=No+Cover'

const coverUrl = computed(() => getOpenLibraryCoverUrl(props.book.cover_i, 'L') || FALLBACK_COVER_URL)
const bookLink = computed(() => `/book/${normalizeOpenLibraryWorkId(props.book.key)}`)
const isBookNew = computed(() => {
  const year = new Date().getFullYear()
  if (Number(props.book.first_publish_year) === year) {
    return true
  }
  else {
    return false
  }
})

function handleImageError(event: Event) {
  const image = event.target as HTMLImageElement

  image.src = FALLBACK_COVER_URL
}
</script>

<template>
  <NuxtLink
    :aria-label="`Открыть книгу ${props.book.title}`"
    class="group relative w-full max-w-[265px] flex flex-col p-4 rounded-2xl bg-white border border-[#E0DED9]
           cursor-pointer transition-all duration-200
           hover:border-[#A3B18A] hover:shadow-[0_8px_24px_rgba(163,177,138,0.2)] hover:-translate-y-1
           active:translate-y-0"
    :to="bookLink"
  >
    <div class="relative mb-4 aspect-3/4 rounded-xl overflow-hidden bg-[#F2F0EB]">
      <img
        :alt="props.book.title"
        class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        :src="coverUrl"
        @error="handleImageError"
      >

      <div
        v-if="isBookNew"
        class="absolute top-2 left-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white bg-[#E07A5F] rounded-md"
      >
        Новинка
      </div>
    </div>

    <div class="flex flex-col flex-1 gap-2">
      <h3 class="font-heading text-[16px] font-semibold text-[#5D5750] line-clamp-2 leading-snug group-hover:text-[#A3B18A] transition-colors duration-200">
        {{ props.book.title }}
      </h3>

      <p class="font-body text-[14px] text-[#9C958B] line-clamp-1 mb-auto">
        {{ props.book.author_name?.join(', ') || 'Автор неизвестен' }}
      </p>

      <span class="font-body text-[12px] text-[#9C958B]">
        Год выпуска
        {{ props.book.first_publish_year }}
      </span>
    </div>

    <span
      aria-hidden="true"
      class="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl
             bg-[#A3B18A] text-white opacity-0 translate-y-2
             group-hover:opacity-100 group-hover:translate-y-0
             transition-all duration-200 shadow-lg
             hover:bg-[#8DA399]"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4v16m8-8H4"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </span>
  </NuxtLink>
</template>
