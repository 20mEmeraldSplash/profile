import React from 'react'
import PropTypes from 'prop-types'
import './FolderIcon.css' // 引入 CSS 文件

function FolderIcon({ imageSrc, label }) {
  return (
    <div className="folder-icon-container">
      {/* 上部分：图片 */}
      <div className="folder-icon-image-container">
        <img src={imageSrc} alt={label} className="folder-icon-image" />
      </div>
      {/* 下部分：文字 */}
      <div className="folder-icon-label">{label}</div>
    </div>
  )
}

FolderIcon.propTypes = {
  imageSrc: PropTypes.string.isRequired, // 图片的 URL
  label: PropTypes.string.isRequired, // 文字标签
}

export default FolderIcon
