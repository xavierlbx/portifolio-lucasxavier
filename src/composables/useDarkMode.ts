import { storeToRefs } from 'pinia'
import { useThemeStore } from '../stores/theme'

export const useDarkMode = () => {
  const themeStore = useThemeStore()
  themeStore.init()

  const { isDark } = storeToRefs(themeStore)

  return {
    isDark,
    toggleDarkMode: () => themeStore.toggleDarkMode(),
    setDarkMode: (value: boolean) => themeStore.setDarkMode(value),
  }
}
