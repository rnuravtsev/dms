import { useEffect, useLayoutEffect } from 'react'

export const useThemeSwitch = () => {
  useLayoutEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? document.documentElement.setAttribute('data-theme', 'dark')
      : document.documentElement.setAttribute('data-theme', 'light')
  })

  useEffect(() => {
    const windowThemeChangeHandler = (evt: MediaQueryListEvent) => {
      if (evt.matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', windowThemeChangeHandler)

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', windowThemeChangeHandler)
  })
}
