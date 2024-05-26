import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'

import { SearchType } from '../../Clinics/types'
import './Tabs.scss'

type SearchTypeProps = {
  className?: string
  searchMode: SearchType
  onChange: ChangeEventHandler<HTMLInputElement>
}

const inputs = [
  {
    id: 'search-type-address',
    type: SearchType.Address,
    label: 'Адрес',
  },
  {
    id: 'search-type-name',
    type: SearchType.Name,
    label: 'Имя',
  },
  {
    id: 'search-type-id',
    type: SearchType.Id,
    label: 'Id',
  },
]

export const Tabs: FC<SearchTypeProps> = props => {
  const { className = '', searchMode, onChange } = props

  return (
    <div className={classNames('search-tabs', className)}>
      <h4 className="search-tabs__title">Тип поиска:</h4>
      <div className="search-tabs__inputs">
        {inputs.map(({ id, type, label }) => (
          <label key={label} className="search-tab__label">
            <input
              id={id}
              className="search-tab__input"
              onChange={onChange}
              name="search-type"
              checked={searchMode === type}
              type="radio"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  )
}
