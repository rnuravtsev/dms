import classNames from 'classnames'
import type { FC } from 'react'

import { useContext } from 'react'
import { YMapHintContext } from 'ymap3-components'
import type { MyHint as MyHintType } from './types'

import './MyHint.scss'

type MyHintProps = {
  className?: string
}

export const MyHint: FC<MyHintProps> = ({ className = '' }) => {
  const { hint } = useContext(YMapHintContext) || {}
  const typedHint = hint as unknown as MyHintType

  return (
    <div className={classNames('hint', className)}>
      <div className="hint__header">
        <div className="hint__name">{typedHint?.name}</div>
        <div className="hint__address">{typedHint?.address}</div>
      </div>
    </div>
  )
}
