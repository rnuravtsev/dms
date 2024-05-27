import classNames from 'classnames'
import { FC, useState } from 'react'
import { useCallback } from 'react'
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
import { YMapLocationRequest } from '@yandex/ymaps3-types'
import type { Hint } from 'ymap3-components/dist/src/components/YMapHint'
import MapPin from '../../assets/icons/map-pin.svg?react'
import { useClinicsContext } from '../../context/clinics'
import { MyHint as MyHintType } from './types'
import { MyHint } from './MyHint'
import { Spinner } from '../Spinner'

import './Map.scss'

type MapProps = {
  className?: string
  mapCenter: YMapLocationRequest
}

export const Map: FC<MapProps> = ({ className = '', mapCenter }) => {
  const [isLoading, setLoading] = useState(true)
  const getHint = useCallback(
    (hint: Hint) => hint?.properties?.hint as MyHintType,
    []
  )

  const { clinics } = useClinicsContext()

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
