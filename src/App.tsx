import { Footer } from '@components/layout/Footer/Footer'
import { Header } from '@components/layout/Header/Header'
import { Main } from '@components/layout/Main/Main'

import './App.scss'

export function App() {
  return (
    <div className="app">
      <Header className="app__header" />
      <Main className="app__main" />
      <Footer className="app__footer" />
    </div>
  )
}
