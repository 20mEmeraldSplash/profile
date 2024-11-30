import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'
import Window from '../Window/Window' // 引入新组件

import pdfIcon from '../../assets/icons/pdf-icon.png'
import folderIcon from '../../assets/icons/folder-icon.png'

import resumePdf from '../../assets/pdf/resume.pdf'

import './DesktopContent.css' // 引入 CSS 文件

function DesktopContent({ children }) {
  const [openWindow, setOpenWindow] = useState(null) // 控制窗口显示的状态

  const openPdfWindow = () => {
    setOpenWindow('pdf')
  }

  const closeWindow = () => {
    setOpenWindow(null)
  }

  return (
    <div className="desktop-content-container">
      {/* PDF 图标 */}
      <div onClick={openPdfWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={pdfIcon} label="Resume" />
      </div>

      {/* Documents 图标 */}
      <FolderIcon imageSrc={folderIcon} label="Documents" />

      {/* 条件渲染窗口 */}
      {openWindow === 'pdf' && (
        <Window type="pdf" onClose={closeWindow}>
          <iframe
            src={resumePdf}
            title="PDF Viewer"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </Window>
      )}
    </div>
  )
}

DesktopContent.propTypes = {
  children: PropTypes.node, // 接受子组件
}

export default DesktopContent
