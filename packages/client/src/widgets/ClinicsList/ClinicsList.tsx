import type { FC } from 'react'
import { debounce } from 'throttle-debounce'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { SearchMode } from './types'
import { Clinics } from '../../shared/types'
import { clinics as clinicsJSON } from '../../shared/adapters/clinicsAdapter'
import VirtualList from 'react-virtualized/dist/es/List'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import classNames from 'classnames'

import './ClinicsList.scss'

type ClinicsListProps = {
  className?: string
  onItemClick: (item: Pick<ElementOfArray<Clinics>, 'coordinates'>) => unknown
}

const filterFunctions = {
  [SearchMode.Address]: (el: ElementOfArray<Clinics>, value: string) =>
    el?.address.toLowerCase().includes(value.toLowerCase()),
  [SearchMode.Id]: (el: ElementOfArray<Clinics>, value: string) =>
    String(el?.id).includes(value),
}

const filterClinics = (clinics: Clinics, type: SearchMode, value: string) => {
  const filterFn = filterFunctions[type]
  if (!filterFn) {
    console.error('Неизвестный тип фильтрации')
    return []
  }

  return clinics.filter(el => filterFn(el, value))
}

export const ClinicsList: FC<ClinicsListProps> = ({
  className = '',
  onItemClick,
}) => {
  const [searchMode, setSearchMode] = useState(SearchMode.Id)
  const [clinics, setClinics] = useState<Clinics>(clinicsJSON)
  const listRef = useRef<number | string | undefined>(800)

  useEffect(() => {
    listRef.current = document?.querySelector(
      '.infinite-scroll-component__outerdiv'
    )?.clientHeight
  }, [])

  const searchModeInputHandleChange: ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setSearchMode(
      e.target.id.toUpperCase().split('-').reverse()[0] as SearchMode
    )
  }

  const inputHandleChange: ChangeEventHandler<HTMLInputElement> = debounce(
    300,
    (e, type: SearchMode = searchMode) => {
      setClinics(filterClinics(clinicsJSON, type, e.target.value))
    }
  )

  return (
    <div className={classNames('clinics', className)}>
      <div className="clinics__meta">
        <div className="clinics__search-mode search-mode">
          <h4 className="search-mode__title">Тип поиска:</h4>
          <div className="search-mode__inputs">
            <label className="search-mode__label">
              <input
                onChange={searchModeInputHandleChange}
                className="search-mode__input"
                name="search-mode"
                type="radio"
                checked={searchMode === SearchMode.Id}
                id="search-mode-id"
              />
              id
            </label>
            <label className="search-mode__label">
              <input
                className="search-mode__input"
                onChange={searchModeInputHandleChange}
                name="search-mode"
                checked={searchMode === SearchMode.Address}
                type="radio"
                id="search-mode-address"
              />
              Адрес
            </label>
          </div>
        </div>
        <p className="clinics__counter">
          Всего: <span className="clinics__quantity">{clinics.length}</span>
        </p>
      </div>
      <div className="clinics__field">
        <input
          className="clinics__input"
          placeholder={`Поиск по ${
            searchMode === SearchMode.Address ? 'адресу' : 'id'
          }`}
          onChange={inputHandleChange}
        />
      </div>
      <div className="clinics__list-wrapper">
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
                    className="clinics__item"
                    style={style}
                    key={key}
                    onClick={() =>
                      onItemClick({
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
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
    </div>
  )
}
