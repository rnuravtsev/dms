import { ChangeEvent, FC, useCallback } from 'react'
import { ChangeEventHandler } from 'react'
import { debounce } from 'throttle-debounce'
import VirtualList from 'react-virtualized/dist/es/List'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import { ClinicsType } from '../../shared/types'
import { clinics as clinicsJSON } from '../../shared/adapters/clinicsAdapter'

import { SearchType } from './types'
import { filteredClinics } from './utils'
import { Search } from '../Search'
import './Clinics.scss'
import { useClientHeight } from './useClientHeight'
import { useUnit } from 'effector-react'
import {
  $clinics,
  $searchType,
  $searchValue,
  updateClinics,
  updateSearchType,
  updateSearchValue,
} from '../../store'

type ClinicsListProps = {
  className?: string
  onItemClick: (
    item: Pick<ElementOfArray<ClinicsType>, 'coordinates'>
  ) => unknown
}

export const Clinics: FC<ClinicsListProps> = ({ onItemClick }) => {
  useClientHeight()

  const [
    changeSearchValue,
    searchType,
    changeClinics,
    clinics,
    changeSearchType,
  ] = useUnit([
    updateSearchValue,
    $searchType,
    updateClinics,
    $clinics,
    updateSearchType,
  ])

  const clearInputValue = useCallback(() => {
    changeSearchValue('')
    changeClinics(filteredClinics(clinicsJSON, searchType, ''))
  }, [])

  const handleTabChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeSearchType(
      e.target.id.toUpperCase().split('-').reverse()[0] as SearchType
    )
    if ($searchValue) {
      clearInputValue()
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    300,
    (e, type: SearchType = searchType) => {
      changeClinics(filteredClinics(clinicsJSON, type, e.target.value))
    }
  )

  return (
    <div className="clinics">
      <div className="clinics__search">
        <Search.Tabs onChange={handleTabChange} />
        <Search.Counter count={clinics.length} />
        <Search.Input onChange={handleInputChange} />
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
