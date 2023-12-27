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
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ada7fd706b6c161e3e6c675f3867b4bb1f3cb74a9c2c6d54bf05c7bbc35a70a08&amp;source=constructor"
        width="100%"
        height="100%"
        frameBorder="0"></iframe>
    </main>
  )
}
