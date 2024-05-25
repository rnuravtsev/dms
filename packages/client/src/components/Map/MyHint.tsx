import classNames from 'classnames'
import type { FC } from 'react'

import { useContext } from 'react'
import { YMapHintContext } from 'ymap3-components'

import './MyHint.scss'

type MyHintProps = {
  className?: string
}

export const MyHint: FC<MyHintProps> = ({ className = '' }) => {
  const hint = useContext(YMapHintContext)

  return (
    <div className={classNames('hint', className)}>
      <div className="hint__header">
        <div className="hint__name">{hint?.hint?.name}</div>
        <div className="hint__address">{hint?.hint?.address}</div>
      </div>
    </div>
  )
}
