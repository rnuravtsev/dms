import { Footer } from './layout/Footer/Footer'
import { Header } from './layout/Header/Header'
import { Main } from './layout/Main/Main'

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
