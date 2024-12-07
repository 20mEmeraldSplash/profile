import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import DesktopContent from './components/DesktopContent/DesktopContent'
import './App.css'
import './styles/global.css'

function App() {
  return (
    <div className="app">
      <Header title="EaseSite" />
      <DesktopContent />
      <Footer />
    </div>
  )
}

export default App
