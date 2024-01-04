import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, login } from '../actions/userAction';
import Loader from '../component/Loader';


const Login = () => {

    const alrt = useAlert();
    const dispatch = useDispatch();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const navigate = useNavigate()

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const handleButtonClick = () => {
        setShowLoginForm(!showLoginForm);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    };

    useEffect(() => {
      if (error) {
        alrt.error(error);
        dispatch(clearErrors());
      }

        if (isAuthenticated) {
        navigate("/account")
      }
    }, [dispatch,alrt,error,isAuthenticated,navigate]);
    

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
   

    

    return (
        <>
           {loading? <Loader /> : <>
                <div className="bag">
                    <div className="login-container mx-auto">
                        <button onClick={handleButtonClick} className={showLoginForm ? "hform" : "sform"}>
                            {showLoginForm ? 'Hide Login Form' : 'Login Form'}
                        </button>
                        {showLoginForm && (
                            <div className="row mt-4 p-3 main-div">
                                <h3 className='text-center tomato fw-bold'>Login</h3>
                                <form className="login-form" onSubmit={handleLogin}>
                                    <div className='p-3 mt-4'>
                                        <div className='p-2 my-3'>
                                            <input type="email" placeholder='Enter your email hear' className='login-input' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                        </div>
                                        <div className='p-2 my-3'>
                                            <input type="password" placeholder='Enter your password hear' className='login-input' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                        </div>
                                        <div className='p-2 my-2 d-flex justify-content-start justify-content-around w-50'>
                                            <input type="checkbox" required /><label htmlFor="checkbox">Check me</label>
                                        </div>
                                        <div className='p-2 my-2'>
                                            <input type="submit" className='sform' required /><br />
                                        </div>
                                        <div className=' col-12 p-2 mt-2 '>
                                            <Link className='text-end' to="/ragister"> new user Ragister now</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
           </>}
            <Footer />
        </>
    );
};

export default Login;
