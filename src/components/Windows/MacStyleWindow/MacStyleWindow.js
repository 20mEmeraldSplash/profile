import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './MacStyleWindow.css'

import closeIcon from '../../../assets/icons/close-icon.png'
import maximizeIcon from '../../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../../assets/icons/minscreen-icon.png'

function MacStyleWindow({ onClose, children }) {
  const [isMaximized, setIsMaximized] = useState(false)

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

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
        </div>
        <div className="mac-window-right"></div>
        <div className="mac-window-content">{children}</div>
      </div>
    </div>
  )
}

MacStyleWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default MacStyleWindow
