import classNames from 'classnames'
import type { FC } from 'react'

import './Header.scss'

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={classNames('header box', className)}>
      <div>
        VH<span className="header__exclamation-mark">!</span>
      </div>
    </header>
  )
}
