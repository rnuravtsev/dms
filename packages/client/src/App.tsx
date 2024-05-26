import { useState } from 'react'
import { ClinicsContextProvider } from './context/clinics'
import { clinics as clinicsJSON } from './shared/adapters/clinicsAdapter'
import { Header } from './layout/Header/Header'
import { Main } from './layout/Main/Main'
import { Footer } from './layout/Footer/Footer'

import './App.scss'

export function App() {
  const [clinics, setClinics] = useState(() => clinicsJSON)

  return (
    <ClinicsContextProvider initialState={{ clinics, setClinics }}>
      <div className="app">
        <Header className="app__header" />
        <Main className="app__main" />
        <Footer className="app__footer" />
      </div>
    </ClinicsContextProvider>
  )
}
