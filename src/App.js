import React, { useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import DesktopContent from './components/DesktopContent/DesktopContent'
import defaultBackground from './assets/background/background-1.jpg'
import './App.css'
import './styles/global.css'

function App() {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground)

  const updateBackgroundImage = newImage => {
    setBackgroundImage(newImage)
  }

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header title="EaseSite" />
      <DesktopContent />
      <Footer onChangeBackground={updateBackgroundImage} />
    </div>
  )
}

export default App
