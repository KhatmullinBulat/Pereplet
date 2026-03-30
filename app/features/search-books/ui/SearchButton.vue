<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'submit',
  disabled: false,
})
</script>

<template>
  <button
    class="h-12 px-6 rounded-xl bg-[#A3B18A] text-white font-medium text-base
           cursor-pointer transition-all duration-200 whitespace-nowrap
           hover:bg-[#8DA399] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(163,177,138,0.3)]
           active:translate-y-0
           disabled:bg-[#D1D5DB] disabled:cursor-not-allowed disabled:opacity-70"
    :disabled="disabled"
    :type="type"
  >
    Искать
  </button>
</template>
