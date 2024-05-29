import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'
import { useUnit } from 'effector-react'

import { SearchType } from '../../Clinics/types'
import { $searchType, $searchValue, updateSearchValue } from '../../../store'

import './Input.scss'

interface InputProps {
  className?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const placeholderMap: Record<SearchType, string> = {
  [SearchType.Address]: 'адресу',
  [SearchType.Id]: 'id',
  [SearchType.Name]: 'названию',
}

export const Input: FC<InputProps> = props => {
  const { className = '', onChange } = props
  const [changeSearchValue, searchValue, searchType] = useUnit([
    updateSearchValue,
    $searchValue,
    $searchType,
  ])

  return (
    <input
      className={classNames('input', className)}
      placeholder={`Поиск по ${placeholderMap[searchType]}`}
      value={searchValue}
      onChange={e => {
        onChange(e)
        changeSearchValue(e.target.value)
      }}
    />
  )
}
