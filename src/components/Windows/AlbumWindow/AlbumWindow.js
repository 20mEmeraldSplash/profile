import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './AlbumWindow.css'

import closeIcon from '../../../assets/icons/close-icon.png'
import maximizeIcon from '../../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../../assets/icons/minscreen-icon.png'

function AlbumWindow({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('library')

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleMenuClick = key => {
    setSelectedMenu(key)
  }

  const menuItems = [
    { key: 'library', label: 'Library' },
    { key: 'map', label: 'Map' },
  ]

  const renderContent = () => {
    switch (selectedMenu) {
      case 'library':
        return <div>Library Content</div>
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
        <div className="album-window-content">{renderContent()}</div>
      </div>
    </div>
  )
}

AlbumWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default AlbumWindow
