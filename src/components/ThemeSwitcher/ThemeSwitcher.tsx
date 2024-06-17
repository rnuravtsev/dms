import classNames from 'classnames'
import { useUnit } from 'effector-react'
import type { FC } from 'react'

import { useThemeSwitch } from '@components/ThemeSwitcher/hooks'
import { $theme, updateTheme } from '@store/index'

import './ThemeSwitcher.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const [theme, setTheme] = useUnit([$theme, updateTheme])

  useThemeSwitch()

  return (
    <div className={classNames('theme-switcher', className)}>
      <div className="theme-switcher__wrapper">
        {theme === 'light' ? (
          <i className="theme-switcher__icon theme-switcher__icon_sun">🌞</i>
        ) : (
          <i className="theme-switcher__icon theme-switcher__icon_moon">🌚</i>
        )}
        <button
          className={classNames(
            'btn',
            'theme-switcher__btn',
            `theme-switcher__btn_type_${theme}`,
          )}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          type="button"
          aria-label="Switch between dark and light theme"
        />
      </div>
    </div>
  )
}
