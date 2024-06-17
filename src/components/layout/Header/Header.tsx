import classNames from 'classnames'
import type { FC } from 'react'

import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher'

import './Header.scss'

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={classNames(className, 'header box')}>
      <div>
        VH<span className="header__exclamation-mark">!</span>
      </div>
      <ThemeSwitcher />
    </header>
  )
}
