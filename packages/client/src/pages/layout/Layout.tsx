import classNames from 'classnames'
import type { FC } from 'react'

import { Header } from './Header/Header'
import { Main } from '../Main/Main'
import { Footer } from './Footer/Footer'

import './Layout.scss'

type LayoutProps = {
  className?: string
}

export const Layout: FC<LayoutProps> = ({ className = '' }) => {
  return (
    <div className={classNames('app', className)}>
      <Header className="app__header" />
      <Main className="app__main" />
      <Footer className="app__footer" />
    </div>
  )
}
