import React from 'react'
import './Trandyplant.css'
import assets from '../assets/assets'

const Trandyplant = () => {
  return (
    <>
    
    <div className='main-trand'>
        <div className='trand-heading'>
            <h1>Our Trendy plants</h1>
        </div>
        <div className='trand-card'>
                <div className='trand-img'>
                    <img src={assets.trand1}/>
                </div>
                <div className='trand-text'>
                    <h2>For Small Decs Ai Plat</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    <h3>Rs. 599/-</h3>
                    <button>Buy Now</button>
                </div>
        </div>
    </div>

    <div className='main-trand1'>
        <div className='trand-card'>
                <div className='trand-img1'>
                    <img src={assets.trand2}/>
                </div>
                <div className='trand-text1'>
                    <h2>For Small Decs Ai Plat</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    <h3>Rs. 579/-</h3>
                    <button>Buy Now</button>
                </div>
        </div>
    </div>
    </>
  )
}

export default Trandyplant
