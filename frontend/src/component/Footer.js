import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='container-fluid bg-dark foot'>
        <div className="row py-3">
          <div className='col-md-3 col-12 my-auto py-4'>
            <p className='white text-center'>downlod our app </p>
            <br />
            <p className='white text-center'>downlod our app for android and ios phone</p>
            <p className='white text-center'><Link className='text-decoration-none white' to="/"><i class="fa-brands fa-google-play"></i>  <i class="fa-brands fa-app-store-ios"></i></Link></p>
          </div>

          <div className='col-md-6 col-12 my-auto py-4'>
            <h1 className='white text-center font1 tomato py-4 fw-bold'>Hadiya-mart <sup><span className='fs-4 fw-light white'><sup>®</sup></span></sup></h1>
            <br />
            <p className='white text-center'>High quality is our priority</p>
            <p className='white text-center'>Copyrights 2023 © Lord Hiren </p>
          </div>

        <div className='col-md-3 col-12 my-auto py-4'>
            <h5 className='white text-center'> Follow us </h5> 
            <p className='white text-center'><Link className='text-decoration-none white' to="https://www.instagram.com/hiren_hadiya_509/"> <i class="fa-brands fa-instagram"></i></Link></p>
            <p className='white text-center'><Link className='text-decoration-none white' to="https://github.com/Kingmaker509/Kingmaker509"> <i class="fa-brands fa-github"></i></Link></p>
            <p className='white text-center'><Link className='text-decoration-none white' to="https://www.linkedin.com/in/hiren-hadiya-6a483a2a2/"> <i class="fa-brands fa-linkedin"></i></Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer