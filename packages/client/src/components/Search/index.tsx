import { Counter } from './Counter/Counter'
import { Tabs } from './Tabs/Tabs'
import { Input } from './Input/Input'
import { ReactNode, useState } from 'react'
import { SearchType } from '../Clinics/types'
import { SearchContextProvider } from '../../context/search'

type SearchProps = { children: ReactNode }

export const Search = ({ children }: SearchProps) => {
  const [searchType, setSearchType] = useState(() => SearchType.Address)

  return (
    <SearchContextProvider initialState={{ searchType, setSearchType }}>
      {children}
    </SearchContextProvider>
  )
}

Search.Counter = Counter
Search.Tabs = Tabs
Search.Input = Input
