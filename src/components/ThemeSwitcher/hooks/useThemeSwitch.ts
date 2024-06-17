import { useUnit } from 'effector-react'
import { useEffect, useLayoutEffect } from 'react'

import { updateTheme } from '@store/index'

export const useThemeSwitch = () => {
  const [changeThemeStore] = useUnit([updateTheme])

  // Проставляем значение при первом рендере, исходя из темы пользователя
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? changeThemeStore('dark')
      : changeThemeStore('light')
  }, [changeThemeStore])

  // Если тема ОС пользователя сменилась
  useLayoutEffect(() => {
    const windowThemeChangeHandler = (evt: MediaQueryListEvent) => {
      evt.matches ? changeThemeStore('dark') : changeThemeStore('light')
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', windowThemeChangeHandler)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', windowThemeChangeHandler)
    }
  })
}
