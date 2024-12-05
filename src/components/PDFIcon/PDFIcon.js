import React from 'react'
import PropTypes from 'prop-types'
import FolderIcon from '../FolderIcon/FolderIcon'

function PDFIcon({ icon, label, pdf, onOpen }) {
  return (
    <div onClick={onOpen} style={{ cursor: 'pointer' }}>
      <FolderIcon imageSrc={icon} label={label} />
    </div>
  )
}

PDFIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pdf: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
}

export default PDFIcon
