import classNames from 'classnames'
import type { FC } from 'react'
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
} from 'ymap3-components'
import { location, features } from './features'

import './Map.scss'

type MapProps = {
  className?: string
}

export const Map: FC<MapProps> = props => {
  const { className = '' } = props
  return (
    <div className={classNames('map', className)}>
      <YMapComponentsProvider
        apiKey={import.meta.env.VITE_YANDEX_API as string}>
        <YMap location={location} mode="vector">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          {/*<YMapDefaultMarker coordinates={location.center} />*/}
        </YMap>
      </YMapComponentsProvider>
    </div>
  )
}
