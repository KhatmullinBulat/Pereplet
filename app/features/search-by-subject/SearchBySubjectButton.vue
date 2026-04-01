<script setup lang="ts">
import type { IBookSubject } from '#entities/book/types/books.types'
import { useBookSearch } from '#entities/book/model/useBookSearch'

interface Props {
  subject: IBookSubject
}

const props = defineProps<Props>()

const { subject: currentSubject, setSubject, fetchBooks } = useBookSearch()

async function searchBySubject(subject: string) {
  setSubject(subject)
  await fetchBooks()
}
</script>

<template>
  <li class="flex py-1">
    <button
      class="group flex flex-col items-center gap-3 p-3 rounded-2xl
                 bg-[#F2F0EB] border border-transparent
                 transition-all duration-200 cursor-pointer
                 hover:bg-white hover:border-[#A3B18A] hover:shadow-[0_4px_12px_rgba(163,177,138,0.15)] hover:-translate-y-1
                 active:translate-y-0"
      :class="props.subject.key === currentSubject ? 'border-[#A3B18A]! bg-white shadow-[0_4px_12px_rgba(163,177,138,0.15)] -translate-y-1' : ''"
      @click="searchBySubject(props.subject.key)"
    >
      <div class="size-18 flex items-center justify-center rounded-xl bg-white/50 group-hover:bg-[#F9FBF7] transition-colors duration-200">
        <img
          :alt="props.subject.label"
          class="size-12 object-contain transition-transform duration-200 group-hover:scale-110"
          :src="props.subject.image"
        >
      </div>

      <p class="text-[14px] text-nowrap font-medium text-[#5D5750] group-hover:text-[#A3B18A] transition-colors duration-200">
        {{ props.subject.label }}
      </p>
    </button>
  </li>
</template>
