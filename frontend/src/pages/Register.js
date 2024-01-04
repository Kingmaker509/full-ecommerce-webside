import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, register } from '../actions/userAction';
import Loader from '../component/Loader';

const Register = () => {
    const alrt = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLoginForm, setShowLoginForm] = useState(false);

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const handleButtonClick = () => {
        setShowLoginForm(!showLoginForm);
    };

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;

    const registerDataChange = (e) => {
        e.preventDefault();

        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            alrt.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate('/account');
        }
    }, [dispatch, alrt, error, isAuthenticated, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);

        dispatch(register(formData));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="bag">
                        <div className="login-container mx-auto">
                            <button onClick={handleButtonClick} className={showLoginForm ? 'hform' : 'sform'}>
                                {showLoginForm ? 'Hide Register Form' : 'Register Form'}
                            </button>
                            {showLoginForm && (
                                <div className="row mt-4 p-3 main-div">
                                    <h3 className="text-center tomato mt-3 fw-bold">Register form</h3>
                                    <form className="registerform" encType="multipart/form-data" onSubmit={handleRegister}>
                                        <div className="p-3">
                                            <div className="p-2 my-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your name here"
                                                    className="login-input"
                                                    required
                                                    name="name"
                                                    value={name}
                                                    onChange={registerDataChange}
                                                />
                                            </div>
                                            <div className="p-2 my-2">
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email here"
                                                    className="login-input"
                                                    required
                                                    name="email"
                                                    value={email}
                                                    onChange={registerDataChange}
                                                />
                                            </div>
                                            <div className="p-2 my-2">
                                                <input
                                                    type="password"
                                                    placeholder="Enter your password here"
                                                    className="login-input"
                                                    required
                                                    name="password"
                                                    value={password}
                                                    onChange={registerDataChange}
                                                />
                                            </div>
                                            <div>
                                                    <img src={avatarPreview} className='profile1' alt="profile1" />
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    onChange={registerDataChange}
                                                />
                                            </div>
                                            <div className="p-2 my-2 d-flex justify-content-start justify-content-around w-50">
                                                <input type="checkbox" required />
                                                <label htmlFor="checkbox">Check me</label>
                                            </div>
                                            <div className="p-2">
                                                <button type="submit" className="sform" value="Register">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            <Footer />
        </>
    );
};

export default Register;
