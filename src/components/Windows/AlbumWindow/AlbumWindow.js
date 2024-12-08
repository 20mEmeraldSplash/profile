import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './AlbumWindow.css'

import closeIcon from '../../../assets/icons/close-icon.png'
import maximizeIcon from '../../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../../assets/icons/minscreen-icon.png'
import wallpaperIcon from '../../../assets/icons/wallpaper-icon.png'

import image1 from '../../../assets/background/background-1.jpg'
import image2 from '../../../assets/background/background-2.jpg'
import image3 from '../../../assets/background/background-3.jpg'
import image4 from '../../../assets/background/background-4.jpg'
import image5 from '../../../assets/background/background-5.jpg'
import image6 from '../../../assets/background/background-6.png'
import image7 from '../../../assets/background/background-7.png'

import thumbnailImage1 from '../../../assets/background/thumbnail/background-1.jpg'
import thumbnailImage2 from '../../../assets/background/thumbnail/background-2.jpg'
import thumbnailImage3 from '../../../assets/background/thumbnail/background-3.jpg'
import thumbnailImage4 from '../../../assets/background/thumbnail/background-4.jpg'
import thumbnailImage5 from '../../../assets/background/thumbnail/background-5.jpg'
import thumbnailImage6 from '../../../assets/background/thumbnail/background-6.png'
import thumbnailImage7 from '../../../assets/background/thumbnail/background-7.png'

function AlbumWindow({ onClose, onChangeBackground }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('library') // 默认选中 Library
  const [viewImage, setViewImage] = useState(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

  const buttonRef = useRef(null)

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

  const handleSetBackground = () => {
    if (viewImage && onChangeBackground) {
      onChangeBackground(viewImage)
    }
    setIsPopupVisible(false)
  }

  const handlePopupToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPopupPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + rect.width / 2 + window.scrollX,
      })
    }
    setIsPopupVisible(!isPopupVisible)
  }

  const handleClickOutside = event => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsPopupVisible(false)
    }
  }

  React.useEffect(() => {
    if (isPopupVisible) {
      window.addEventListener('click', handleClickOutside)
    }
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isPopupVisible])

  const menuItems = [
    {
      title: 'Photos',
      items: [
        { key: 'library', label: 'Library' },
        { key: 'wallpaper', label: 'Wallpaper' },
        { key: 'avatar', label: 'Avatar' },
      ],
    },
    {
      title: 'My Artwork',
      items: [
        { key: '2023', label: '2023' },
        { key: '2024', label: '2024' },
      ],
    },
  ]

  const libraryImages = [
    {
      thumbnail: thumbnailImage1,
      original: image1,
      category: 'wallpaper',
    },
    {
      thumbnail: thumbnailImage2,
      original: image2,
      category: 'wallpaper',
    },
    {
      thumbnail: thumbnailImage3,
      original: image3,
      category: 'wallpaper',
    },
    {
      thumbnail: thumbnailImage4,
      original: image4,
      category: 'wallpaper',
    },
    {
      thumbnail: thumbnailImage5,
      original: image5,
      category: 'avatar',
    },
    {
      thumbnail: thumbnailImage6,
      original: image6,
      category: 'avatar',
    },
    {
      thumbnail: thumbnailImage7,
      original: image7,
      category: '2023',
    },
  ]

  const renderLibraryContent = () => {
    const filteredImages =
      selectedMenu === 'library'
        ? libraryImages // 显示所有图片
        : libraryImages.filter(
            image => image.category.toLowerCase() === selectedMenu
          )

    return (
      <div className="album-window-library-content">
        <div className="album-window-library-grid">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="album-window-library-item"
              onClick={() => handleImageClick(image.original)}
            >
              <img
                src={image.thumbnail}
                alt={`Library ${index}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMenu = () => (
    <div className="album-window-menu">
      {menuItems.map((menu, index) => (
        <div key={index} className="menu-section">
          <div className="menu-title">{menu.title}</div>
          <div className="menu-items">
            {menu.items.map(item => (
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
      ))}
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
    return renderLibraryContent() // 始终根据 `selectedMenu` 显示相应内容
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
          {renderMenu()}
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
              <button
                className="exit-fullscreen-button"
                onClick={handlePopupToggle}
                ref={buttonRef}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </button>
              {isPopupVisible && (
                <div
                  className="popup"
                  style={{
                    position: 'absolute',
                    top: `${popupPosition.top}px`,
                    left: `${popupPosition.left}px`,
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                  }}
                >
                  <button onClick={handleSetBackground}>
                    <img
                      src={wallpaperIcon}
                      alt="Wallpaper Icon"
                      style={{ marginRight: '5px', height: '16px' }}
                    />
                    Set Wallpaper
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="album-window-content-header">
              <div className="album-window-content-header-title">
                {menuItems.find(item => item.key === selectedMenu)?.label ||
                  'Library'}
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
  onChangeBackground: PropTypes.func,
}

export default AlbumWindow
