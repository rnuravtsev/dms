import classNames from 'classnames'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import './Main.scss'
import { Map } from '../../../widgets/Map/Map'
import { location } from './utils'
import { ClinicsList } from '../../../widgets/ClinicsList/ClinicsList'
import { Clinics } from '../../../shared/types'

type MainProps = {
  className?: string
}

export const Main: FC<MainProps> = ({ className = '' }) => {
  const [mapCenter, setMapCenter] = useState(location)

  const handleClinicClick = useCallback(
    ({ longitude, latitude }: Pick<ElementOfArray<Clinics>, 'coordinates'>) => {
      setMapCenter({
        center: [+longitude, +latitude],
        zoom: 16,
        duration: 750,
      })
    },
    []
  )

  return (
    <main className={classNames('main box', className)}>
      <aside>
        <ClinicsList onItemClick={handleClinicClick} />
      </aside>
      <Map mapCenter={mapCenter} />
    </main>
  )
}
