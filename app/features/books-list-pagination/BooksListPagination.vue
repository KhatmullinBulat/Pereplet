<script setup lang="ts">
import { useBookSearch } from '#entities/book/model/useBookSearch'

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const MAX_VISIBLE = 5

const { pageDown, pageUp, goToPage } = useBookSearch()

const canGoPrev = computed(() => props.currentPage > 1)
const canGoNext = computed(() => props.currentPage < props.totalPages)

const visiblePages = computed(() => {
  const pages: number[] = []
  let start = Math.max(1, props.currentPage - Math.floor(MAX_VISIBLE / 2))
  const end = Math.min(props.totalPages, start + MAX_VISIBLE - 1)

  if (end - start < MAX_VISIBLE - 1) {
    start = Math.max(1, end - MAX_VISIBLE + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<template>
  <div class="flex items-center justify-center gap-2 py-6">
    <button
      aria-label="Предыдущая страница"
      class="w-10 h-10 flex items-center justify-center rounded-full
             bg-[#F2F0EB] border border-transparent
             text-[#5D5750] cursor-pointer
             hover:bg-[#A3B18A] hover:text-white hover:shadow-[0_4px_12px_rgba(163,177,138,0.3)]
             disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F2F0EB] disabled:hover:text-[#5D5750] disabled:hover:shadow-none"
      :disabled="!canGoPrev"
      @click="pageDown"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19l-7-7 7-7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>

    <div class="flex items-center gap-1">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-medium cursor-pointer"
        :class="[
          currentPage === page
            ? 'bg-[#A3B18A] text-white shadow-[0_4px_12px_rgba(163,177,138,0.3)]'
            : 'bg-[#F2F0EB] text-[#5D5750] hover:bg-white hover:border-[#A3B18A] hover:border',
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      aria-label="Следующая страница"
      class="w-10 h-10 flex items-center justify-center rounded-full
             bg-[#F2F0EB] border border-transparent
             text-[#5D5750] cursor-pointer
             hover:bg-[#A3B18A] hover:text-white hover:shadow-[0_4px_12px_rgba(163,177,138,0.3)]
             disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F2F0EB] disabled:hover:text-[#5D5750] disabled:hover:shadow-none"
      :disabled="!canGoNext"
      @click="pageUp"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5l7 7-7 7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>
  </div>
</template>
