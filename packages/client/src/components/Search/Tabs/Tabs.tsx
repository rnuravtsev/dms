import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'

import { SearchType } from '../../Clinics/types'
import './Tabs.scss'
import { useSearchContext } from '../../../context/search'

type SearchTypeProps = {
  className?: string
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
  const { className = '', onChange } = props
  const { searchType } = useSearchContext()

  return (
    <div className={classNames('search-tabs', className)}>
      <div className="search-tabs__inputs">
        {inputs.map(({ id, type, label }) => {
          const isActive = searchType === type

          return (
            <label
              key={label}
              className={classNames('search-tab__label', {
                // 'search-tab__input_active': isActive,
              })}>
              <input
                id={id}
                className="search-tab__input"
                onChange={onChange}
                name="search-type"
                checked={isActive}
                type="radio"
              />
              {label}
            </label>
          )
        })}
      </div>
    </div>
  )
}
