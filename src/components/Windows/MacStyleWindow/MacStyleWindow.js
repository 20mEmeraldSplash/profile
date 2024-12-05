import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './MacStyleWindow.css'

import closeIcon from '../../../assets/icons/close-icon.png'
import maximizeIcon from '../../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../../assets/icons/minscreen-icon.png'

import appStoreIcon from '../../../assets/outline-icons/app-store-icon.png'
import desktopIcon from '../../../assets/outline-icons/desktop-icon.png'
import documentsIcon from '../../../assets/outline-icons/documents-icon.png'

import easestarLogo from '../../../assets/logos/easestar.png'
import easesoundLogo from '../../../assets/logos/easesound.png'

import AppStoreComponent from '../../AppStoreComponent/AppStoreComponent'

function MacStyleWindow({ onClose, defaultMenu, children }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(defaultMenu)
  const [currentContent, setCurrentContent] = useState(null)

  useEffect(() => {
    setSelectedMenu(defaultMenu) // Ensure the selected menu updates if the default changes
    handleMenuClick(defaultMenu)
  }, [defaultMenu])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleMenuClick = key => {
    setSelectedMenu(key)
    // 根据选中的菜单项设置当前内容
    switch (key) {
      case 'desktop':
        setCurrentContent(<div>Desktop Content</div>) // 替换为实际的内容
        break
      case 'appStore':
        setCurrentContent(
          <div className="macstyle-window-content-container">
            <AppStoreComponent
              title="EaseStar"
              description="An innovative social app designed for creators and privacy-conscious users. Share your artwork, photos, and thoughts freely, knowing your content is protected from unwanted downloads or screenshots."
              image={easestarLogo}
            />
            <AppStoreComponent
              title="EaseSound"
              description="A unique app that transforms your Apple Watch into a personal soundboard. Upload your favorite MP3 files through your iPhone, and trigger sounds with a simple flick of your wrist—making every movement a part of your musical expression."
              image={easesoundLogo}
            />
          </div>
        ) // 替换为实际的内容
        break
      case 'documents':
        setCurrentContent(<div>Documents Content</div>) // 替换为实际的内容
        break
      default:
        setCurrentContent(null)
    }
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
                onClick={() => handleMenuClick(item.key)}
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

          {currentContent}
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
