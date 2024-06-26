import classNames from 'classnames'
import { useCallback, useState } from 'react'
import type { FC } from 'react'

import { Clinics } from '@components/Clinics/Clinics'
import { Map } from '@components/Map/Map'
import { Sidebar } from '@components/Sidebar/Sidebar'
import type { ClinicsType } from '@shared/types'

import { location } from './utils'

import './Main.scss'

type MainProps = {
  className?: string
}

export const Main: FC<MainProps> = ({ className = '' }) => {
  const [mapCenter, setMapCenter] = useState(location)

  const handleClinicClick = useCallback(
    ({ coordinates }: Pick<ElementOfArray<ClinicsType>, 'coordinates'>) => {
      setMapCenter({
        center: [+coordinates.longitude, +coordinates.latitude],
        zoom: 16,
        duration: 750,
      })
    },
    [],
  )

  return (
    <main className={classNames(className, 'main')}>
      <Sidebar>
        <Clinics onItemClick={handleClinicClick} />
      </Sidebar>
      <Map mapCenter={mapCenter} />
    </main>
  )
}
