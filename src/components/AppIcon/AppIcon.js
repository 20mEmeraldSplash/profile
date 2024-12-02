import React from 'react'
import PropTypes from 'prop-types'
import './AppIcon.css'

function AppIcon({ src, alt }) {
  return (
    <div className="app-icon">
      <img src={src} alt={alt || 'App Icon'} className="app-icon__image" />
    </div>
  )
}

AppIcon.propTypes = {
  src: PropTypes.string.isRequired, // 图片的 URL 是必填项
  alt: PropTypes.string, // 替代文本
}

export default AppIcon
