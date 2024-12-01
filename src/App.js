import React from 'react'
import Header from './components/Header/Header'
import DesktopContent from './components/DesktopContent/DesktopContent'
import './App.css'
import './styles/global.css'

function App() {
  return (
    <div className="app">
      <Header title="Yichen Site" />
      <DesktopContent />
    </div>
  )
}

export default App
