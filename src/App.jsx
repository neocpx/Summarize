import React from 'react'
import Header from './components/Header'
import Screen from './components/Screen'

import './App.css'

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"/>
        </div>
        <div className="app">
          <Header/>
          <Screen/>
      </div>
    </main>
  )
}

export default App