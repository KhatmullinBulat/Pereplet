<script setup lang="ts">
import { BOOK_SUBJECTS } from '#shared/config/bookSubjects'
</script>

<template>
  <div class="w-full px-6">
    <ul class="flex justify-between overflow-x-auto gap-4">
      <SearchBySubjectButton
        v-for="subject in BOOK_SUBJECTS"
        :key="subject.key"
        :subject="subject"
      />
    </ul>
  </div>
</template>
