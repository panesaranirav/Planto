import React from 'react'
import './PageNotFound.css'
const PageNotFound = () => {
  return (
    <div className="notfound-container">
    <h1>404</h1>
    <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
    <a href="/home" className="notfound-home-button">Back to Home</a>
  </div>
  )
}

export default PageNotFound
