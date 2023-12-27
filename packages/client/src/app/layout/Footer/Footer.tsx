import classNames from 'classnames'
import type { FC } from 'react'

import './Footer.scss'

interface FooterProps {
  className?: string
}

export const Footer: FC<FooterProps> = props => {
  const { className = '' } = props
  return (
    <footer className={classNames('footer box', className)}>
      <div>Footer</div>
    </footer>
  )
}
