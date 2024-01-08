import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
// import logo from '../imges/hadiyamart.png';

const Nav = () => {

    const { isAuthenticated, user } = useSelector(state => state.user);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <h4 className='tomato font1'>Hadiya-mart</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 list-ul">
                            <li className="nav-item list-li">
                                <Link className="nav-link active white list-a" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item list-li">
                                <Link className="nav-link active white list-a" aria-current="page" to="/products">Category</Link>
                            </li>
                            <li className="nav-item list-li">
                                <Link className="nav-link active white list-a" aria-current="page" to={isAuthenticated ? "/account" : "/login"}>{isAuthenticated ? "Account" : "Login"}</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link active white pt-3 ps-4" aria-current="page" to={isAuthenticated ? "/cart" : "/"}>{isAuthenticated ? <i className="fas fa-shopping-cart"></i> : " "}</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link active white pt-2 ps-4" aria-current="page" to={isAuthenticated ? "/account" : "/login"}>{isAuthenticated ? <img src={user.avatar.url} className='img-fluid profile1' alt="peofile" /> : <img src="/photo.png" className='img-fluid profile1' alt="peofile" />}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav