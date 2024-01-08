import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader';
import { useNavigate } from 'react-router-dom';
import { Country, State } from 'country-state-city'
import Footer from '../component/Footer';
import MetaData from '../component/MetaData';
import { saveShippingInfo } from '../actions/cartActions';

const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);
    const { loading, isAuthenticated } = useSelector(state => state.user);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setcountry] = useState(shippingInfo.countey);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNO, setPhoneNo] = useState(shippingInfo.phoneNO);


    const ShippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNO.length !== 10) {
            alert.error("Phone number should be 10 digits");
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pincode, phoneNO })
        );
        navigate("/order/confirm");

    };
    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    <MetaData title="Shipping details -- Hadiya-mart" />

                    <div className='container-fluid py-5 bg-super'>
                        <div className='container'>
                            <h3 className='text-center font3 reviews-hd p-2 my-4 mx-auto w-25'>Shipping</h3>
                            <div className="row">
                                <div className="col-lg-6 col-sm-10 mx-auto bg-white border-tomato">
                                    <form onSubmit={ShippingSubmit} encType='multipart/form-data'>
                                        <div className='p-5'>
                                            <input type="text"
                                                className='shipinput p-1 mx-4 my-2'
                                                placeholder='Address...'
                                                value={address}
                                                name='address'
                                                onChange={(e) => setAddress(e.target.value)}
                                            />

                                            <input type="text"
                                                className='shipinput p-1 mx-4 my-2'
                                                placeholder='City...'
                                                value={city}
                                                name='city'
                                                onChange={(e) => setCity(e.target.value)}
                                            />

                                            <input type="number"
                                                className='shipinput p-1 mx-4 my-2'
                                                placeholder='Number...'
                                                value={phoneNO}
                                                name='phoneno'
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                            />

                                            <input type="number"
                                                className='shipinput p-1 mx-4 my-2'
                                                placeholder='Pincode...'
                                                value={pincode}
                                                name='pincode'
                                                onChange={(e) => setPincode(e.target.value)}
                                            />

                                            <select className='shipinput p-1 mx-4 my-2' value={country} onChange={(e) => setcountry(e.target.value)}>
                                                <option >Country</option>
                                                {Country && Country.getAllCountries().map((item) => (
                                                    <option
                                                        key={item.isoCode} value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {country && (
                                                <select className='shipinput p-1 mx-4 my-2' value={state} onChange={(e) => setState(e.target.value)}>
                                                    <option >State</option>
                                                    {State && State.getStatesOfCountry(country).map((item) => (
                                                        <option
                                                            key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}


                                            <button type='submit' className='btn-outline-tomato text-center py-1 my-4 w-90 mx-4 font1'>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <>
                    {navigate("/login")}
                </>}
            </>}
            <Footer />
        </>
    )
}

export default Shipping