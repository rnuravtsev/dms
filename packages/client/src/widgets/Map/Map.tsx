import classNames from 'classnames'
import type { FC } from 'react'
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapMarker,
  YMapControls,
  YMapZoomControl,
  YMapGeolocationControl,
  YMapCollection,
  YMapHint,
} from 'ymap3-components'
import { YMapLocationRequest } from '@yandex/ymaps3-types'
import { clinics } from '../../shared/adapters/clinicsAdapter'
import MapPin from '../../assets/map-pin.svg?react'

import './Map.scss'
import { useCallback } from 'react'
import { MyHint } from './MyHint'

type MapProps = {
  className?: string
  mapCenter: YMapLocationRequest
}

export const Map: FC<MapProps> = ({ className = '', mapCenter }) => {
  const getHint = useCallback(object => object?.properties?.hint, [])

  return (
    <div className={classNames('map', className)}>
      <YMapComponentsProvider
        apiKey={import.meta.env.VITE_YANDEX_API as string}>
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
