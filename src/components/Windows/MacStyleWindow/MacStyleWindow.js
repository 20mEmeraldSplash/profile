import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './MacStyleWindow.css'

import closeIcon from '../../../assets/icons/close-icon.png'
import maximizeIcon from '../../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../../assets/icons/minscreen-icon.png'

import appStoreIcon from '../../../assets/outline-icons/app-store-icon.png'
import desktopIcon from '../../../assets/outline-icons/desktop-icon.png'
import documentsIcon from '../../../assets/outline-icons/documents-icon.png'

function MacStyleWindow({ onClose, defaultMenu, children }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(defaultMenu)

  useEffect(() => {
    setSelectedMenu(defaultMenu) // Ensure the selected menu updates if the default changes
  }, [defaultMenu])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const menuItems = [
    { key: 'desktop', label: 'Desktop', icon: desktopIcon },
    { key: 'appStore', label: 'App Store', icon: appStoreIcon },
    { key: 'documents', label: 'Documents', icon: documentsIcon },
  ]

  return (
    <div className="mac-window-overlay">
      <div className={`mac-window ${isMaximized ? 'maximized' : ''}`}>
        <div className="mac-window-sidebar">
          <div className="mac-window-buttons">
            <button
              className="mac-window-button close"
              onClick={onClose}
              style={{
                backgroundImage: `url(${closeIcon})`,
              }}
            ></button>

            <button
              className="mac-window-button maximize"
              onClick={toggleMaximize}
              style={{
                backgroundImage: `url(${isMaximized ? minimizeIcon : maximizeIcon})`,
              }}
            ></button>
          </div>

          <div className="mac-window-menu">
            {menuItems.map(item => (
              <div
                key={item.key}
                className={`mac-window-menu-item ${
                  selectedMenu === item.key ? 'active' : ''
                }`}
                onClick={() => setSelectedMenu(item.key)}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} Icon`}
                  className="mac-window-menu-icon"
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="mac-window-content">
          <div className="mac-window-content-header">
            <div className="mac-window-content-header-title">
              {menuItems.find(item => item.key === selectedMenu)?.label ||
                'Select a Menu'}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

MacStyleWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  defaultMenu: PropTypes.string, // Menu to open by default
  children: PropTypes.node,
}

export default MacStyleWindow
