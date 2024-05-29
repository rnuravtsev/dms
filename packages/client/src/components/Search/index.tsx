import { Counter } from './Counter/Counter'
import { Tabs } from './Tabs/Tabs'
import { Input } from './Input/Input'
import { ReactNode } from 'react'

type SearchProps = { children: ReactNode }

export const Search = ({ children }: SearchProps) => {
  return <>{children}</>
}

Search.Counter = Counter
Search.Tabs = Tabs
Search.Input = Input
