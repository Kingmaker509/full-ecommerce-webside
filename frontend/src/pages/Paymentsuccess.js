import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { createOrder } from '../actions/orderAction';
import Loader from '../component/Loader';
import MetaData from '../component/MetaData';
import Footer from '../component/Footer';

const Paymentsuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    const [referenceNum, setReferenceNum] = useState(null);

    // ... (calculate ShippingCharge, tex, amount)
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const ShippingCharge = subtotal >= 500 ? 0 : 100;
    const tex = subtotal * 0.18;
    const amount = subtotal + ShippingCharge + tex;

    const seachQuery = useSearchParams()[0];
    useEffect(() => {
        const reference = seachQuery.get('reference');
        setReferenceNum(reference);
    }, [seachQuery]);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: subtotal,
        texPrice: tex,
        shippingPrice: ShippingCharge,
        totalPrice: amount,
        paymentInfo: {
            id: referenceNum,
            status: "success",
        },
        pinCode: shippingInfo.pincode,
        phoneNo: shippingInfo.phoneNO,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (referenceNum) {
                dispatch(createOrder(order));
                alert.success('Order placed successfully');
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [dispatch, alert, referenceNum, order]);

    const goToHome = () => {
        navigate('/');
    };

    const goToOrder = () => {
        navigate('/account');
    };

    return (
        <>
            <MetaData title="Payment Success -- Hadiya-mart" />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {isAuthenticated ? (
                        <div className="container-fluid bg-super py-5">
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="text-center font3 p-2 my-4 mx-auto w-25">
                                            Payment Success <span><i className="fa-regular fa-circle-check green"></i></span>
                                        </h3>
                                        <p className="text-center"> Ref no :- <span className="text-secondary font3"> {referenceNum} </span></p>
                                        <div className="text-center">
                                            <button onClick={() => goToHome()} className="btn-outline-tomato text-center m-3 py-2 px-4 my-4 font1">
                                                Go Home
                                            </button>
                                            <button onClick={() => goToOrder()} className="btn-outline-tomato text-center m-3 py-2 px-4 my-4 font1">
                                                View order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        navigate('/login')
                    )}
                </>
            )}
            <Footer />
        </>
    );
};

export default Paymentsuccess;
