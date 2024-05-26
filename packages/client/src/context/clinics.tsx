import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react'
import type { ClinicsType } from '../shared/types'

type InitialState<State> = {
  clinics: State
  setClinics: Dispatch<SetStateAction<State>>
}

const ClinicsContext = createContext<InitialState<ClinicsType>>(
  {} as InitialState<ClinicsType>
)

export const ClinicsContextProvider = ({
  initialState,
  children,
}: {
  initialState: InitialState<ClinicsType>
  children: ReactNode
}) => {
  return (
    <ClinicsContext.Provider value={initialState}>
      {children}
    </ClinicsContext.Provider>
  )
}

export const useClinicsContext = () => {
  const context = useContext(ClinicsContext)

  if (context === undefined) {
    throw Error('useClinicsContext must be used inside ClinicsContextProvider')
  }

  return context
}
