<script setup lang="ts">
import SearchIcon from '#shared/assets/icons/SearchIcon.vue'

interface Props {
  placeholder?: string
}

const _ = withDefaults(defineProps<Props>(), {
  placeholder: 'Найти книгу...',
})

const model = defineModel()
</script>

<template>
  <div class="relative w-full max-w-[450px]">
    <input
      v-model="model"
      class="w-full h-12 pl-12 pr-5 rounded-xl bg-[#F2F0EB] text-[#5D5750] placeholder-[#9C958B]
           border border-transparent outline-none transition-all duration-200
           hover:bg-[#EBE9E4] focus:bg-white focus:border-[#A3B18A] focus:shadow-[0_4px_12px_rgba(163,177,138,0.2)]"
      :placeholder="placeholder"
    >

    <SearchIcon class="absolute top-3 left-4" />
  </div>
</template>
