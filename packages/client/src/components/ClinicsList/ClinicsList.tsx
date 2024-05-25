import type { FC } from 'react'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { debounce } from 'throttle-debounce'
import VirtualList from 'react-virtualized/dist/es/List'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import { Clinics } from '../../shared/types'
import { clinics as clinicsJSON } from '../../shared/adapters/clinicsAdapter'
import { useClinicsContext } from '../../context/clinics'
import { SearchSwitch } from '../SearchSwitch/SearchSwitch'

import { SearchType } from './types'
import './ClinicsList.scss'
import { filteredClinics } from './utils'

type ClinicsListProps = {
  className?: string
  onItemClick: (item: Pick<ElementOfArray<Clinics>, 'coordinates'>) => unknown
}

export const ClinicsList: FC<ClinicsListProps> = ({ onItemClick }) => {
  const { clinics, setClinics } = useClinicsContext()
  const [searchType, setSearchType] = useState(SearchType.Address)
  const listRef = useRef<number | string | undefined>(800)

  useEffect(() => {
    listRef.current = document?.querySelector(
      '.infinite-scroll-component__outerdiv'
    )?.clientHeight
  }, [])

  const searchTypeInputHandleChange: ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setSearchType(
      e.target.id.toUpperCase().split('-').reverse()[0] as SearchType
    )
  }

  const inputHandleChange: ChangeEventHandler<HTMLInputElement> = debounce(
    300,
    (e, type: SearchType = searchType) => {
      setClinics(filteredClinics(clinicsJSON, type, e.target.value))
    }
  )

  return (
    <>
      <div className="clinics__meta">
        <SearchSwitch
          searchMode={searchType}
          searchModeInputHandleChange={searchTypeInputHandleChange}
        />
        <p className="clinics__counter">
          Всего: <span className="clinics__quantity">{clinics.length}</span>
        </p>
      </div>
      <div className="clinics__field">
        <input
          className="clinics__input"
          placeholder={`Поиск по ${
            searchType === SearchType.Address ? 'адресу' : 'id'
          }`}
          onChange={inputHandleChange}
        />
      </div>
      <div>
        <AutoSizer>
          {({ width, height }) => (
            <VirtualList
              className="clinics"
              width={width}
              height={height}
              rowHeight={80}
              rowCount={clinics.length}
              noRowsRenderer={() => (
                <p className="clinics__empty">Нет данных</p>
              )}
              rowRenderer={({ key, index, style }) => {
                const { id, name, address, coordinates } = clinics[index]
                return (
                  <div
                    className="clinics__item"
                    style={style}
                    key={key}
                    onClick={() =>
                      onItemClick({
                        coordinates: {
                          latitude: coordinates.latitude,
                          longitude: coordinates.longitude,
                        },
                      })
                    }>
                    <p style={{ color: 'blue' }}>{id}</p>
                    <p>{address}</p>
                    <p>{name}</p>
                  </div>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
    </>
  )
}
