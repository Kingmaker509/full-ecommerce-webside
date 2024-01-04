import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../component/Footer'

const Error = () => {
    return (
        <>
            {/* <div className="container bg-super">
                <div className=' container-fluid text-center pt-5 '>
                    <h1 className='fs-big'>Error 4<b><span class="load"></span></b>4 page not found</h1>
                    <p >Go to home page from hear</p>
                    <Link to="/" className='text-decoration-none font1'> <button className='btn btn-outline-tomato px-6 py-2'>GO home</button></Link>
                </div>
            </div> */}
            <div className="container-fluid bg-super">
                <div className="container">
                    <div className="row">
                        <div className="col-12 py-5 text-center">
                            <h1 className='fs-big'>Error 4<b><span class="load"></span></b>4 page not found</h1>
                            <p >Go to home page from hear</p>
                            <Link to="/" className='text-decoration-none font1'> <button className='btn btn-outline-tomato px-6 py-2'>GO home</button></Link>
                        </div>
                    </div>
                </div>
            </div> 
            <Footer />
        </>
    )
}

export default Error