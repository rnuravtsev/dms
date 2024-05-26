import { FC, useCallback } from 'react'
import { ChangeEventHandler, useEffect, useRef } from 'react'
import { debounce } from 'throttle-debounce'
import VirtualList from 'react-virtualized/dist/es/List'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import { ClinicsType } from '../../shared/types'
import { clinics as clinicsJSON } from '../../shared/adapters/clinicsAdapter'
import { useClinicsContext } from '../../context/clinics'

import { SearchType } from './types'
import { filteredClinics } from './utils'
import { Search } from '../Search'
import { useSearchContext } from '../../context/search'
import './Clinics.scss'

type ClinicsListProps = {
  className?: string
  onItemClick: (
    item: Pick<ElementOfArray<ClinicsType>, 'coordinates'>
  ) => unknown
}

export const Clinics: FC<ClinicsListProps> = ({ onItemClick }) => {
  const { clinics, setClinics } = useClinicsContext()
  const { searchType, setSearchType, searchInputValue, setSearchInputValue } =
    useSearchContext()

  const listRef = useRef<number | string | undefined>(800)

  const clearInputValue = useCallback(() => {
    setSearchInputValue('')
    setClinics(filteredClinics(clinicsJSON, searchType, ''))
  }, [])

  useEffect(() => {
    listRef.current = document?.querySelector(
      '.infinite-scroll-component__outerdiv'
    )?.clientHeight
  }, [])

  const handleTabChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchType(
      e.target.id.toUpperCase().split('-').reverse()[0] as SearchType
    )

    if (searchInputValue) {
      clearInputValue()
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    300,
    (e, type: SearchType = searchType) => {
      setClinics(filteredClinics(clinicsJSON, type, e.target.value))
    }
  )

  return (
    <div className="clinics">
      <div className="clinics__search">
        <Search.Tabs searchMode={searchType} onChange={handleTabChange} />
        <Search.Counter count={clinics.length} />
        <Search.Input searchType={searchType} onChange={handleInputChange} />
      </div>
      <div>
        <AutoSizer>
          {({ width, height }) => (
            <VirtualList
              className="clinics__list"
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
                    key={key}
                    className="clinics__item"
                    style={style}
                    onClick={() =>
                      onItemClick({
                        coordinates: {
                          latitude: coordinates.latitude,
                          longitude: coordinates.longitude,
                        },
                      })
                    }>
                    <p className="clinics__id">{id}</p>
                    <p>{address}</p>
                    <p>{name}</p>
                  </div>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}
