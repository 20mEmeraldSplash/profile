import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'
import Window from '../Window/Window' // 引入新组件

import pdfIcon from '../../assets/icons/pdf-icon.png'
import folderIcon from '../../assets/icons/folder-icon.png'
import appStoreIcon from '../../assets/icons/appstore-icon.png'

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

  const openBlankWindow = () => {
    setOpenWindow('blank') // 设置状态为打开空白窗口
  }

  return (
    <div className="desktop-content-container">
      {/* PDF 图标 */}
      <div onClick={openPdfWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={pdfIcon} label="Resume" />
      </div>

      {/* App Store 图标 */}
      <div onClick={openBlankWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={appStoreIcon} label="App Store" />
      </div>

      {/* Documents 图标 */}
      <div onClick={openBlankWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={folderIcon} label="Documents" />
      </div>

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
      {openWindow === 'blank' && ( // 新增条件渲染空白窗口
        <Window type="blank" onClose={closeWindow}>
          <h1>Hello</h1>
        </Window>
      )}
    </div>
  )
}

DesktopContent.propTypes = {
  children: PropTypes.node, // 接受子组件
}

export default DesktopContent
