import classNames from 'classnames'
import type { FC } from 'react'

import './Header.scss'

interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = props => {
  const { className = '' } = props
  return (
    <header className={classNames('header box', className)}>
      <div>Header</div>
    </header>
  )
}
