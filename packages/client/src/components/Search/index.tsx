import { SearchType } from '../Clinics/types'
import { SearchContextProvider } from '../../context/search'

import { Counter } from './Counter/Counter'
import { Tabs } from './Tabs/Tabs'
import { Input } from './Input/Input'
import { ReactNode, useState } from 'react'

type SearchProps = { children: ReactNode }

export const Search = ({ children }: SearchProps) => {
  const [searchType, setSearchType] = useState(SearchType.Address)
  const [searchInputValue, setSearchInputValue] = useState('')

  return (
    <SearchContextProvider
      initialState={{
        searchType,
        setSearchType,
        searchInputValue,
        setSearchInputValue,
      }}>
      {children}
    </SearchContextProvider>
  )
}

Search.Counter = Counter
Search.Tabs = Tabs
Search.Input = Input
