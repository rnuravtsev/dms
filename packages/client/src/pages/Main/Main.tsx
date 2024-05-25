import classNames from 'classnames'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import './Main.scss'
import { Map } from '../../components/Map/Map'
import { location } from './utils'
import { ClinicsList } from '../../components/ClinicsList/ClinicsList'
import { Clinics } from '../../shared/types'
import { Sidebar } from '../../components/Sidebar/Sidebar'

type MainProps = {
  className?: string
}

export const Main: FC<MainProps> = ({ className = '' }) => {
  const [mapCenter, setMapCenter] = useState(location)

  const handleClinicClick = useCallback(
    ({ coordinates }: Pick<ElementOfArray<Clinics>, 'coordinates'>) => {
      setMapCenter({
        center: [+coordinates.longitude, +coordinates.latitude],
        zoom: 16,
        duration: 750,
      })
    },
    []
  )

  return (
    <main className={classNames('main box', className)}>
      <Sidebar>
        <ClinicsList onItemClick={handleClinicClick} />
      </Sidebar>
      <Map mapCenter={mapCenter} />
    </main>
  )
}
