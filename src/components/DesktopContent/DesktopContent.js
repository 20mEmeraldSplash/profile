import React from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'

import pdfIcon from '../../assets/icons/pdf-icon.png'
import folderIcon from '../../assets/icons/folder-icon.png'

import './DesktopContent.css' // 引入 CSS 文件

function DesktopContent({ children }) {
  return (
    <div className="desktop-content-container">
      <FolderIcon imageSrc={pdfIcon} label="Resume" />
      <FolderIcon imageSrc={folderIcon} label="Documents" />
    </div>
  )
}

DesktopContent.propTypes = {
  children: PropTypes.node, // 接受子组件
}

export default DesktopContent
