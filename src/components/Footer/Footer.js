import React, { useState } from 'react'
import AppIcon from '../AppIcon/AppIcon'
import AlbumWindow from '../Windows/AlbumWindow/AlbumWindow' // 引入 AlbumWindow
import EaseStarLogo from '../../assets/logos/easestar.png'
import EaseSoundLogo from '../../assets/logos/easesound.png'
import ImageLogo from '../../assets/logos/image-icon.png'
import './Footer.css'

function Footer() {
  const [isAlbumWindowOpen, setIsAlbumWindowOpen] = useState(false)

  const handleAlbumClick = () => {
    setIsAlbumWindowOpen(true)
  }

  const closeAlbumWindow = () => {
    setIsAlbumWindowOpen(false)
  }

  const [isSmallWindow, setIsSmallWindow] = useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallWindow(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <footer className={`footer ${isSmallWindow ? 'small-window' : ''}`}>
        <a
          href="https://apps.apple.com/us/app/easestar/id6471627227"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon src={EaseStarLogo} alt="EaseStar App Icon" />
        </a>

        <div onClick={handleAlbumClick} style={{ cursor: 'pointer' }}>
          <AppIcon src={ImageLogo} alt="Album" />
        </div>
        <a
          href="https://apps.apple.com/us/app/easesound/id6737292686"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon src={EaseSoundLogo} alt="EaseSound App Icon" />
        </a>
      </footer>

      {isAlbumWindowOpen && <AlbumWindow onClose={closeAlbumWindow} />}
    </>
  )
}

export default Footer
