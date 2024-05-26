import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react'
import { SearchType } from '../components/Clinics/types'

type InitialState = {
  searchType: SearchType
  setSearchType: Dispatch<SetStateAction<SearchType>>
  searchInputValue: string
  setSearchInputValue: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext({} as InitialState)

export const SearchContextProvider = ({
  children,
  initialState,
}: {
  children: ReactNode
  initialState: InitialState
}) => {
  return (
    <SearchContext.Provider value={initialState}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearchContext should be inside a SearchContextProvider')
  }

  return context
}
