import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PDFWindow.css'
import '../../styles/variables.css'

import closeIcon from '../../assets/icons/close-icon.png'
import maximizeIcon from '../../assets/icons/fullscreen-icon.png'
import minimizeIcon from '../../assets/icons/minscreen-icon.png'

function PDFWindow({ type, onClose, children }) {
  const [isMaximized, setIsMaximized] = useState(false)

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <div className="window-overlay">
      <div className={`window ${type} ${isMaximized ? 'maximized' : ''}`}>
        <div className="window-header">
          <div className="window-header-left">
            <button
              className="close-button"
              onClick={onClose}
              style={{
                backgroundImage: `url(${closeIcon})`,
                backgroundSize: 'cover',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
                cursor: 'pointer',
              }}
            ></button>
            <button
              className="maximize-button"
              onClick={toggleMaximize}
              style={{
                backgroundImage: `url(${isMaximized ? minimizeIcon : maximizeIcon})`,
                backgroundSize: 'cover',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
                cursor: 'pointer',
              }}
            ></button>
          </div>
          <span className="window-title">
            {type === 'pdf'
              ? 'PDF Viewer'
              : type === 'blank'
                ? 'Blank Window'
                : 'Window'}
          </span>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </div>
  )
}

PDFWindow.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default PDFWindow
