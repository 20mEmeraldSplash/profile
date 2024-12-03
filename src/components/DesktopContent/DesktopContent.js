import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'
import PDFWindow from '../PDFWindow/PDFWindow'
import MacStyleWindow from '../Windows/MacStyleWindow/MacStyleWindow'

import pdfIcon from '../../assets/icons/pdf-icon.png'
import folderIcon from '../../assets/icons/folder-icon.png'
import appStoreIcon from '../../assets/icons/appstore-icon.png'

import resumePdf from '../../assets/pdf/resume.pdf'

import './DesktopContent.css'

function DesktopContent({ children }) {
  const [openWindow, setOpenWindow] = useState(null)

  const openPdfWindow = () => {
    setOpenWindow('pdf')
  }

  const closeWindow = () => {
    setOpenWindow(null)
  }

  const openAppStoreWindow = () => {
    setOpenWindow('appStore')
  }

  return (
    <div className="desktop-content-container">
      <div onClick={openPdfWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={pdfIcon} label="Resume" />
      </div>

      <div onClick={openAppStoreWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={appStoreIcon} label="App Store" />
      </div>

      <div onClick={openAppStoreWindow} style={{ cursor: 'pointer' }}>
        <FolderIcon imageSrc={folderIcon} label="Documents" />
      </div>

      {openWindow === 'pdf' && (
        <PDFWindow type="pdf" onClose={closeWindow}>
          <iframe
            src={resumePdf}
            title="PDF Viewer"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </PDFWindow>
      )}
      {openWindow === 'appStore' && (
        <MacStyleWindow onClose={closeWindow}>
          <div style={{ padding: '16px' }}>
            <h1>Welcome to the App Store</h1>
            <p>Browse and install your favorite applications here!</p>
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
