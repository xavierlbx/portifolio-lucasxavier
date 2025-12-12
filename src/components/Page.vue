<script setup lang="ts">
import { Button, ToggleSwitch, Card, InputText } from 'primevue'
import { ref } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
const checked = ref(isDark.value)

const handleToggle = () => {
  toggleDarkMode()
  checked.value = isDark.value
}

const title = 'Welcome to My Portfolio'
</script>
<template>
  <div
    class="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-stone-100 px-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
  >
    <div class="flex max-w-4xl flex-col items-center gap-8 text-center">
      <h1
        class="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl dark:text-slate-200"
      >
        {{ title }}
      </h1>

      <!-- Controle do Dark Mode -->
      <div
        class="flex items-center gap-4 rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-slate-800/80"
      >
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
          {{ isDark ? 'Dark Mode' : 'Light Mode' }}
        </span>
        <ToggleSwitch v-model="checked" @change="handleToggle" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
