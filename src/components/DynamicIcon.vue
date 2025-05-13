<script setup lang="ts">
import { defineProps } from 'vue'
import type { FunctionalComponent } from 'vue'

defineProps<{
  icon: FunctionalComponent
  size?: number
}>()
</script>

<template>
  <component :is="icon" :size="size" />
</template>
