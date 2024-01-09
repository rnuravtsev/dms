import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'
import clinics from '../../../../data.json'
import { useCallback, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import './Main.scss'
import { Map } from './Map/Map'

type MainProps = {
  className?: string
}

type Clinics = typeof clinics

const enum SearchMode {
  Address = 'ADDRESS',
  Label = 'LABEL',
  Id = 'ID',
}

const SHOW_ITEMS_QUANTITY = 10

const filterFunctions = {
  [SearchMode.Address]: (el: ElementOfArray<Clinics>, value: string) =>
    el.address.toLowerCase().includes(value.toLowerCase()),
  [SearchMode.Label]: (el: ElementOfArray<Clinics>, value: string) =>
    el.label.toLowerCase().includes(value.toLowerCase()),
  [SearchMode.Id]: (el: ElementOfArray<Clinics>, value: string) =>
    el.id === +value,
}

const filterClinics = (clinics: Clinics, type: SearchMode, value: string) => {
  const filterFn = filterFunctions[type]
  if (!filterFn) {
    console.error('Неизвестный тип фильтрации')
    return []
  }

  return clinics.filter(el => filterFn(el, value)).slice(0, SHOW_ITEMS_QUANTITY)
}

export const Main: FC<MainProps> = props => {
  const { className = '' } = props

  const startIndex = useRef(0)
  const [filteredClinics, setFilteredClinics] = useState<Clinics>(
    clinics.slice(startIndex.current, startIndex.current + SHOW_ITEMS_QUANTITY)
  )
  const [searchMode, setSearchMode] = useState(SearchMode.Address)

  const inputHandleChange: ChangeEventHandler<HTMLInputElement> = (
    e,
    type: SearchMode = searchMode
  ) => {
    setFilteredClinics(filterClinics(clinics, type, e.target.value))
  }

  const searchModeInputHandleChange: ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setSearchMode(
      e.target.id.toUpperCase().split('-').reverse()[0] as SearchMode
    )
  }

  const addMoreClinics = () => {
    startIndex.current += SHOW_ITEMS_QUANTITY

    setFilteredClinics(filteredClinics => [
      ...filteredClinics,
      ...clinics.slice(
        startIndex.current,
        startIndex.current + SHOW_ITEMS_QUANTITY
      ),
    ])
  }

  return (
    <main className={classNames('main box', className)}>
      <aside>
        <div className="clinics">
          <div className="clinics__meta">
            <div className="clinics__search-mode search-mode">
              <h4 className="search-mode__title">Тип поиска:</h4>
              <div className="search-mode__inputs">
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
                <label className="search-mode__label">
                  <input
                    onChange={searchModeInputHandleChange}
                    className="search-mode__input"
                    name="search-mode"
                    type="radio"
                    checked={searchMode === SearchMode.Label}
                    id="search-mode-label"
                  />
                  Название
                </label>
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
              </div>
            </div>
            <p className="clinics__counter">
              Всего: <span className="clinics__quantity">{clinics.length}</span>
            </p>
          </div>
          <div className="clinics__field field">
            <input
              className="field__input"
              placeholder={`Поиск по ${
                searchMode === SearchMode.Address ? 'адресу' : 'названию'
              }`}
              onChange={inputHandleChange}
            />
          </div>
          <InfiniteScroll
            className="clinics__list"
            loader={false}
            dataLength={startIndex.current * SHOW_ITEMS_QUANTITY}
            hasMore={clinics.length > filteredClinics.length}
            next={addMoreClinics}
            height={500}
            scrollThreshold={0.9}
            endMessage="Клиник больше нет">
            {filteredClinics.map(({ id, label, address }) => (
              <li className="field__item" key={id}>
                <p style={{ color: 'blue' }}>{id}</p>
                <p>{label}</p>
                <p>{address}</p>
              </li>
            ))}
          </InfiniteScroll>
        </div>
      </aside>
      <Map />
      {/*<iframe*/}
      {/*  className="main__map"*/}
      {/*  src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab70d110c86780c0a6ec670145f47f9d02b7c1d3634aef445702195c612a70b91&amp;source=constructor"*/}
      {/*  width="100%"*/}
      {/*  height="100%"*/}
      {/*  frameBorder="0"></iframe>*/}
    </main>
  )
}
