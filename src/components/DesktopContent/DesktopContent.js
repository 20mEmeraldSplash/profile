import React from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'

import pdfIcon from '../../assets/icons/pdf-icon.png'
import folderIcon from '../../assets/icons/folder-icon.png'

import resumePdf from '../../assets/pdf/resume.pdf'

import './DesktopContent.css' // 引入 CSS 文件

function DesktopContent({ children }) {
  const openPdf = () => {
    // 替换为你的 PDF 文件的路径
    const newTab = window.open(resumePdf, '_blank') // 在新标签页打开 PDF 文件
    if (!newTab) {
      alert('Popup blocked! Please allow popups for this site.')
    }
  }

  return (
    <div className="desktop-content-container">
      <div onClick={openPdf} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={pdfIcon} label="Resume" />
      </div>
      <FolderIcon imageSrc={folderIcon} label="Documents" />
    </div>
  )
}

DesktopContent.propTypes = {
  children: PropTypes.node, // 接受子组件
}

export default DesktopContent
