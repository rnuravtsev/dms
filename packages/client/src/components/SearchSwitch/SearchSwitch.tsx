import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'

import { SearchType } from '../ClinicsList/types'
import './SearchSwitch.scss'

interface SearchTypeProps {
  className?: string
  searchMode: SearchType
  searchModeInputHandleChange: ChangeEventHandler<HTMLInputElement>
}

export const SearchSwitch: FC<SearchTypeProps> = props => {
  const { className = '', searchMode, searchModeInputHandleChange } = props

  return (
    <div className={classNames('search-type', className)}>
      <h4 className="search-type__title">Тип поиска:</h4>
      <div className="search-type__inputs">
        <label className="search-type__label">
          <input
            className="search-type__input"
            onChange={searchModeInputHandleChange}
            name="search-type"
            checked={searchMode === SearchType.Address}
            type="radio"
            id="search-type-address"
          />
          Адрес
        </label>
        <label className="search-type__label">
          <input
            onChange={searchModeInputHandleChange}
            className="search-type__input"
            name="search-type"
            type="radio"
            checked={searchMode === SearchType.Id}
            id="search-type-id"
          />
          id
        </label>
      </div>
    </div>
  )
}
