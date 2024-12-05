import React from 'react'
import PropTypes from 'prop-types'
import './AppStoreComponent.css'

function AppStoreComponent({ title, description, image }) {
  return (
    <div className="appstore-component">
      <div className="appstore-body">
        <div className="appstore-text">
          <div className="appstore-header">YICHEN FAVORITES</div>
          <div className="appstore-title">{title}</div>
          <p className="appstore-description">{description}</p>
        </div>
        <div className="appstore-image">
          <img src={image} alt={`${title} logo`} />
        </div>
      </div>
    </div>
  )
}

AppStoreComponent.propTypes = {
  title: PropTypes.string.isRequired, // The title of the app (e.g., EaseStar)
  description: PropTypes.string.isRequired, // A brief description of the app
  image: PropTypes.string.isRequired, // URL of the app image or logo
}

export default AppStoreComponent
