import React from 'react'
import PropTypes from 'prop-types'
import './Window.css' // 引入 CSS 文件

function Window({ type, onClose, children }) {
  return (
    <div className="window-overlay">
      <div className={`window ${type}`}>
        <div className="window-header">
          <span>{type === 'pdf' ? 'PDF Viewer' : 'Window'}</span>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
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
