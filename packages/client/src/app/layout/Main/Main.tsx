import classNames from 'classnames'
import type { FC } from 'react'

import './Main.scss'

interface MainProps {
  className?: string
}

export const Main: FC<MainProps> = props => {
  const { className = '' } = props
  return (
    <main className={classNames('main box', className)}>
      <iframe
        className="main__map"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab70d110c86780c0a6ec670145f47f9d02b7c1d3634aef445702195c612a70b91&amp;source=constructor"
        width="100%"
        height="100%"
        frameBorder="0"></iframe>
    </main>
  )
}
