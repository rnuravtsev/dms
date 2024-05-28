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
    <div className="app">
      <Header className="app__header" />
      <ClinicsContextProvider initialState={{ clinics, setClinics }}>
        <Main className="app__main" />
      </ClinicsContextProvider>
      <Footer className="app__footer" />
    </div>
  )
}
