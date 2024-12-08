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

import backgroundImage1 from '../../../assets/background/background-1.jpg'
import backgroundImage2 from '../../../assets/background/background-2.jpg'
import backgroundImage3 from '../../../assets/background/background-3.jpg'
import backgroundImage4 from '../../../assets/background/background-4.jpg'
import backgroundImage5 from '../../../assets/background/background-5.jpg'
import backgroundImage6 from '../../../assets/background/background-6.png'
import backgroundImage7 from '../../../assets/background/background-7.png'

import thumbnailBackgroundImage1 from '../../../assets/background/thumbnail/background-1.jpg'
import thumbnailBackgroundImage2 from '../../../assets/background/thumbnail/background-2.jpg'
import thumbnailBackgroundImage3 from '../../../assets/background/thumbnail/background-3.jpg'
import thumbnailBackgroundImage4 from '../../../assets/background/thumbnail/background-4.jpg'
import thumbnailBackgroundImage5 from '../../../assets/background/thumbnail/background-5.jpg'
import thumbnailBackgroundImage6 from '../../../assets/background/thumbnail/background-6.png'
import thumbnailBackgroundImage7 from '../../../assets/background/thumbnail/background-7.png'

function AlbumWindow({ onClose, onChangeBackground }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('library')
  const [viewImage, setViewImage] = useState(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

  const buttonRef = useRef(null) // 用于获取按钮的位置

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
    setIsPopupVisible(false) // 关闭弹窗
  }

  const handlePopupToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPopupPosition({
        top: rect.bottom + window.scrollY + 8, // 让弹窗出现在按钮正下方，8px 间距
        left: rect.left + rect.width / 2 + window.scrollX, // 弹窗居中对齐按钮
      })
    }
    setIsPopupVisible(!isPopupVisible)
  }

  const handleClickOutside = event => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsPopupVisible(false) // 点击外部区域时关闭弹窗
    }
  }

  // 在组件挂载时添加事件监听器
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
      title: 'Library',
      items: [
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
    { thumbnail: thumbnailBackgroundImage1, original: backgroundImage1 },
    { thumbnail: thumbnailBackgroundImage2, original: backgroundImage2 },
    { thumbnail: thumbnailBackgroundImage3, original: backgroundImage3 },
    { thumbnail: thumbnailBackgroundImage4, original: backgroundImage4 },
    { thumbnail: thumbnailBackgroundImage5, original: backgroundImage5 },
    { thumbnail: thumbnailBackgroundImage6, original: backgroundImage6 },
    { thumbnail: thumbnailBackgroundImage7, original: backgroundImage7 },
  ]

  const renderLibraryContent = () => (
    <div className="album-window-library-content">
      <div className="album-window-library-grid">
        {libraryImages.map((image, index) => (
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
                ref={buttonRef} // 绑定按钮的 ref
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
                    transform: 'translateX(-50%)', // 水平居中对齐按钮
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
  onChangeBackground: PropTypes.func,
}

export default AlbumWindow
