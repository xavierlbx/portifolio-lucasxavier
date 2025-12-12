<script setup lang="ts">
import { useDarkMode } from './composables/useDarkMode'
import Page from './components/Page.vue'

useDarkMode()
</script>

<template>
  <Page />
</template>
