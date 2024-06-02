import classNames from 'classnames'
import type { FC } from 'react'

import './Footer.scss'

type FooterProps = {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={classNames('footer box', className)}>
      <div className="footer__sign">
        mw&nbsp;<span className="footer__heart">&#60;3</span>
      </div>
    </footer>
  )
}
