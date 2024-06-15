import classNames from 'classnames'
import { useUnit } from 'effector-react'
import type { FC } from 'react'

import { $theme, updateTheme } from '@store/index'

import './ThemeSwitcher.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const [theme, changeTheme] = useUnit([$theme, updateTheme])

  return (
    <div className={classNames('theme-switcher', className)}>
      <div className="theme-switcher__wrapper">
        {theme === 'light' ? (
          <i className="theme-switcher__icon theme-switcher__icon_sun">🌞</i>
        ) : (
          <i className="theme-switcher__icon theme-switcher__icon_moon">🌜</i>
        )}
        <button
          className={classNames('btn', 'theme-switcher__btn', {
            'theme-switcher__btn_type_dark': theme === 'dark',
            'theme-switcher__btn_type_light': theme === 'light',
          })}
          onClick={() => changeTheme(theme)}
          type="button"
          aria-label="Switch between dark and light theme"
        />
      </div>
    </div>
  )
}
