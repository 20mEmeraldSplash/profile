import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './AlbumWindow.css'

import closeIcon from '../../../assets/icons/close-icon.png'
import maximizeIcon from '../../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../../assets/icons/minscreen-icon.png'

import backgroundImage1 from '../../../assets/background/background-1.jpg'
import backgroundImage2 from '../../../assets/background/background-2.jpg'

function AlbumWindow({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('library')
  const [viewImage, setViewImage] = useState(null)

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleMenuClick = key => {
    setSelectedMenu(key)
  }

  const handleImageClick = image => {
    setViewImage(image)
  }

  const handleExitImageView = () => {
    setViewImage(null)
  }

  const menuItems = [
    { key: 'library', label: 'Library' },
    { key: 'map', label: 'Map' },
  ]

  // List of images for the Library
  const libraryImages = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage1,
    backgroundImage2,
    backgroundImage1,
    backgroundImage2,
    backgroundImage1,
    backgroundImage2,
    backgroundImage1,
    backgroundImage2,
  ]

  const renderLibraryContent = () => (
    <div className="album-window-library-content">
      <div className="album-window-library-grid">
        {libraryImages.map((image, index) => (
          <div
            key={index}
            className="album-window-library-item"
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`Library ${index}`} />
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    if (viewImage) {
      return (
        <div className="album-window-library-content single-image-container">
          <img src={viewImage} alt="Full view" className="fullscreen-image" />
        </div>
      )
    }
    switch (selectedMenu) {
      case 'library':
        return renderLibraryContent()
      case 'map':
        return <div>Map Content</div>
      default:
        return null
    }
  }

  return (
    <div className="album-window-overlay">
      <div className={`album-window ${isMaximized ? 'maximized' : ''}`}>
        <div className="album-window-sidebar">
          <div className="album-window-buttons">
            <button
              className="album-window-button close"
              onClick={onClose}
              style={{
                backgroundImage: `url(${closeIcon})`,
              }}
            ></button>

            <button
              className="album-window-button maximize"
              onClick={toggleMaximize}
              style={{
                backgroundImage: `url(${isMaximized ? minimizeIcon : maximizeIcon})`,
              }}
            ></button>
          </div>

          <div className="album-window-menu">
            {menuItems.map(item => (
              <div
                key={item.key}
                className={`album-window-menu-item ${
                  selectedMenu === item.key ? 'active' : ''
                }`}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="album-window-content">
          {viewImage ? (
            <div className="album-window-content-header-view-image">
              <button
                className="exit-fullscreen-button"
                onClick={handleExitImageView}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>
          ) : (
            <div className="album-window-content-header">
              <div className="album-window-content-header-title">
                {menuItems.find(item => item.key === selectedMenu)?.label ||
                  'Select a Menu'}
              </div>
            </div>
          )}

          {renderContent()}
        </div>
      </div>
    </div>
  )
}

AlbumWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default AlbumWindow
