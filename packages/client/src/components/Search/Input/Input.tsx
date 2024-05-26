import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'

import { SearchType } from '../../Clinics/types'
import { useSearchContext } from '../../../context/search'
import './Input.scss'

interface InputProps {
  className?: string
  searchType: SearchType
  onChange: ChangeEventHandler<HTMLInputElement>
}

const placeholderMap: Record<SearchType, string> = {
  [SearchType.Address]: 'адресу',
  [SearchType.Id]: 'id',
  [SearchType.Name]: 'названию',
}

export const Input: FC<InputProps> = props => {
  const { searchInputValue, setSearchInputValue } = useSearchContext()
  const { className = '', searchType, onChange } = props

  return (
    <input
      className={classNames('input', className)}
      placeholder={`Поиск по ${placeholderMap[searchType]}`}
      value={searchInputValue}
      onChange={e => {
        onChange(e)
        setSearchInputValue(e.target.value)
      }}
    />
  )
}
