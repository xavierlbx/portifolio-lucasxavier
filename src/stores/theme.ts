import { defineStore } from 'pinia'

type ThemePreference = 'dark' | 'light' | null

const STORAGE_KEY = 'theme'

const getSystemPrefersDark = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const applyHtmlThemeClass = (isDark: boolean) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark)
}

const loadPreference = (): ThemePreference => {
  if (typeof localStorage === 'undefined') return null
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return null
}

const savePreference = (preference: ThemePreference) => {
  if (typeof localStorage === 'undefined') return
  if (preference) localStorage.setItem(STORAGE_KEY, preference)
  else localStorage.removeItem(STORAGE_KEY)
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false as boolean,
    preference: null as ThemePreference,
    initialized: false as boolean,
  }),

  actions: {
    init() {
      if (this.initialized) return
      this.initialized = true

      this.preference = loadPreference()

      this.isDark = this.preference ? this.preference === 'dark' : getSystemPrefersDark()

      applyHtmlThemeClass(this.isDark)

      if (typeof window === 'undefined') return

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (event: MediaQueryListEvent) => {
        if (this.preference) return
        this.isDark = event.matches
        applyHtmlThemeClass(this.isDark)
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)
    },

    toggleDarkMode() {
      this.setDarkMode(!this.isDark)
    },

    setDarkMode(value: boolean) {
      this.isDark = value
      this.preference = value ? 'dark' : 'light'
      savePreference(this.preference)
      applyHtmlThemeClass(this.isDark)
    },

    clearThemePreference() {
      this.preference = null
      savePreference(null)
      this.isDark = getSystemPrefersDark()
      applyHtmlThemeClass(this.isDark)
    },
  },
})
