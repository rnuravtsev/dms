import classNames from 'classnames'
import type { FC } from 'react'

import './Counter.scss'

interface CounterProps {
  className?: string
  count: number
}

export const Counter: FC<CounterProps> = props => {
  const { className = '', count } = props
  return (
    <p className={classNames('counter', className)}>
      Всего: <span className="counter__number">{count}</span>
    </p>
  )
}
