// eslint-disable-next-line import/no-unresolved
import type { YMapLocationRequest } from '@yandex/ymaps3-types'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { useCallback, useState } from 'react'
import type { FC } from 'react'
import {
  YMap,
  YMapCollection,
  YMapComponentsProvider,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapGeolocationControl,
  YMapHint,
  YMapMarker,
  YMapZoomControl,
} from 'ymap3-components'
import type { Hint } from 'ymap3-components/dist/src/components/YMapHint'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MapPin from '@assets/icons/map-pin.svg?react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { $clinics } from '@store'

import { Spinner } from '../Spinner'

import { MyHint } from './MyHint'
import type { MyHint as MyHintType } from './types'

import './Map.scss'

type MapProps = {
  className?: string
  mapCenter: YMapLocationRequest
}

export const Map: FC<MapProps> = ({ className = '', mapCenter }) => {
  const [isLoading, setLoading] = useState(true)
  const getHint = useCallback(
    (hint: Hint) => hint?.properties?.hint as MyHintType,
    [],
  )

  const [clinics] = useUnit([$clinics])

  const handleMapLoad = () => {
    setLoading(false)
  }

  return (
    <div className={classNames('map', className)}>
      {isLoading && <Spinner />}
      <YMapComponentsProvider
        apiKey={import.meta.env.VITE_YANDEX_API as string}
        onLoad={handleMapLoad}>
        <YMap key="map" location={mapCenter} mode="vector" theme="dark">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <YMapControls position="right">
            <YMapZoomControl />
            <YMapGeolocationControl />
          </YMapControls>
          <YMapHint hint={getHint}>
            <MyHint />
          </YMapHint>
          <YMapCollection>
            {clinics.map(({ id, coordinates, hint }) => (
              <YMapMarker
                properties={{ hint }}
                key={id}
                coordinates={[+coordinates.longitude, +coordinates.latitude]}
                hideOutsideViewport>
                <div className="pin">
                  <MapPin className="pin__marker" />
                  <p className="pin__id">{id}</p>
                </div>
              </YMapMarker>
            ))}
          </YMapCollection>
        </YMap>
      </YMapComponentsProvider>
    </div>
  )
}
