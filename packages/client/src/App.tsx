import './assets/styles/index.scss'
import { Layout } from './pages/layout/Layout'
import { ClinicsContextProvider } from './context/clinics'
import { clinics as clinicsJSON } from './shared/adapters/clinicsAdapter'
import { useState } from 'react'

export function App() {
  const [clinics, setClinics] = useState(() => clinicsJSON)
  return (
    <ClinicsContextProvider initialState={{ clinics, setClinics }}>
      <Layout />
    </ClinicsContextProvider>
  )
}
