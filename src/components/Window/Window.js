import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Window.css'
import '../../styles/variables.css' // 引入 CSS 变量

function Window({ type, onClose, children }) {
  const [isMaximized, setIsMaximized] = useState(false) // 控制窗口是否放大

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
                backgroundColor: 'var(--close-button-color)',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
              }}
            ></button>
            <button
              className="maximize-button"
              onClick={toggleMaximize}
              style={{
                backgroundColor: 'var(--maximize-button-color)',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
              }}
            ></button>
          </div>
          <span className="window-title">
            {type === 'pdf' ? 'PDF Viewer' : 'Window'}
          </span>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </div>
  )
}

Window.propTypes = {
  type: PropTypes.string.isRequired, // 窗口类型，例如 'pdf'
  onClose: PropTypes.func.isRequired, // 关闭窗口的回调函数
  children: PropTypes.node, // 窗口的内容
}

export default Window
