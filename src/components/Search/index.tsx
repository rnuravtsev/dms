import type { ReactNode } from 'react'

import { Counter } from './Counter/Counter'
import { Input } from './Input/Input'
import { Tabs } from './Tabs/Tabs'

type SearchProps = { children: ReactNode }

export const Search = ({ children }: SearchProps) => {
  return <>{children}</>
}

Search.Counter = Counter
Search.Tabs = Tabs
Search.Input = Input
