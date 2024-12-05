import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'
import PDFWindow from '../Windows/PDFWindow/PDFWindow'
import MacStyleWindow from '../Windows/MacStyleWindow/MacStyleWindow'
import AppStoreComponent from '../AppStoreComponent/AppStoreComponent'

import pdfIcon from '../../assets/icons/pdf-icon.png'
import folderIcon from '../../assets/icons/folder-icon.png'
import appStoreIcon from '../../assets/icons/appstore-icon.png'

import easestarLogo from '../../assets/logos/easestar.png'
import easesoundLogo from '../../assets/logos/easesound.png'

import resumePdf from '../../assets/pdf/resume.pdf'

import './DesktopContent.css'

function DesktopContent() {
  const [openWindow, setOpenWindow] = useState(null)
  const [defaultMenu, setDefaultMenu] = useState('appStore') // 默认菜单项

  // 打开PDF窗口
  const openPdfWindow = () => {
    setOpenWindow('pdf')
  }

  // 关闭窗口
  const closeWindow = () => {
    setOpenWindow(null)
  }

  // 打开App Store窗口
  const openAppStoreWindow = () => {
    setOpenWindow('appStore')
    setDefaultMenu('appStore') // 设置默认菜单为App Store
  }

  // 打开Documents窗口
  const openDocumentsWindow = () => {
    setOpenWindow('documents') // 使用同一个MacStyleWindow
    setDefaultMenu('documents') // 设置默认菜单为Documents
  }

  return (
    <div className="desktop-content-container">
      {/* PDF 图标 */}
      <div onClick={openPdfWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={pdfIcon} label="Resume" />
      </div>

      {/* App Store 图标 */}
      <div onClick={openAppStoreWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={appStoreIcon} label="App Store" />
      </div>

      {/* Documents 图标 */}
      <div onClick={openDocumentsWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={folderIcon} label="Documents" />
      </div>

      {/* 条件渲染PDF窗口 */}
      {openWindow === 'pdf' && (
        <PDFWindow type="pdf" onClose={closeWindow}>
          <iframe
            src={resumePdf}
            title="PDF Viewer"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </PDFWindow>
      )}

      {/* 条件渲染MacStyleWindow */}
      {openWindow === 'appStore' && (
        <MacStyleWindow onClose={closeWindow} defaultMenu={defaultMenu}>
          <div className="macstyle-window-content-container">
            <AppStoreComponent
              title="EaseStar"
              description="An innovative social app designed for creators and privacy-conscious users. Share your artwork, photos, and thoughts freely, knowing your content is protected from unwanted downloads or screenshots."
              image={easestarLogo}
            />
            <AppStoreComponent
              title="EaseSound"
              description="A unique app that transforms your Apple Watch into a personal soundboard. Upload your favorite MP3 files through your iPhone, and trigger sounds with a simple flick of your wrist—making every movement a part of your musical expression."
              image={easesoundLogo}
            />
          </div>
        </MacStyleWindow>
      )}

      {openWindow === 'documents' && (
        <MacStyleWindow onClose={closeWindow} defaultMenu={defaultMenu}>
          {/* 在此处可添加额外内容 */}
          <div className="macstyle-window-content-container">
            <p>HIII</p>
          </div>
        </MacStyleWindow>
      )}
    </div>
  )
}

DesktopContent.propTypes = {
  children: PropTypes.node,
}

export default DesktopContent
