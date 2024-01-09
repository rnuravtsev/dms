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
} from 'ymap3-components'
import { location, features } from './features'
import clinics from '../../../../../vhi-output.json'
import MapPin from '../../../../assets/map-pin.svg?react'

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
        <YMap key="map" location={location} mode="vector" theme="dark">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <YMapControls position="right">
            <YMapZoomControl />
            <YMapGeolocationControl />
          </YMapControls>
          {clinics.map(({ id, longitude, latitude, description }) => (
            <YMapMarker
              key={id}
              title={description}
              coordinates={[+longitude, +latitude]}
              hideOutsideViewport={true}>
              <div className="pin">
                <MapPin className="pin__marker" />
                <p className="pin__id">{id}</p>
              </div>
            </YMapMarker>
          ))}
        </YMap>
      </YMapComponentsProvider>
    </div>
  )
}
