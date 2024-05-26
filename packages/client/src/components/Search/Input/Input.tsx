import classNames from 'classnames'
import type { ChangeEventHandler, FC } from 'react'

import { SearchType } from '../../Clinics/types'
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
  const { className = '', searchType, onChange } = props
  return (
    <input
      className={classNames('input', className)}
      placeholder={`Поиск по ${placeholderMap[searchType]}`}
      onChange={onChange}
    />
  )
}
