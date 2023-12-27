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
      <div>Main</div>
    </main>
  )
}
