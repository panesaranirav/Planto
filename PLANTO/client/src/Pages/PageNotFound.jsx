import React from 'react'
import './PageNotFound.css'
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className="notfound-container">
    <h1>404</h1>
    <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
    <Link to="/home" className="notfound-home-button">Back to Home</Link>
  </div>
  )
}

export default PageNotFound
