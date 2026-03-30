<script setup lang="ts">
import CartIcon from '#shared/assets/icons/CartIcon.vue'

interface Props {
  count?: number
}

defineProps<Props>()
</script>

<template>
  <button
    class="w-12 h-12 flex items-center justify-center border border-[#E0DED9] rounded-xl
           bg-white cursor-pointer transition-all duration-200
           hover:border-[#A3B18A] hover:bg-[#F9FBF7]"
  >
    <div class="relative flex items-center justify-center">
      <CartIcon class="w-6 h-6 text-[#5D5750] transition-colors duration-200 group-hover:text-[#A3B18A]" />

      <span
        v-if="count && count > 0"
        class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#E07A5F] text-white
               text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white"
      >
        {{ count }}
      </span>
    </div>
  </button>
</template>
