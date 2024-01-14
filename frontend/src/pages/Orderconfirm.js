import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import { useSelector } from 'react-redux';
import MetaData from '../component/MetaData';
import Footer from '../component/Footer';
import Cartitams from '../component/Cartitams';
import axios from 'axios';

const Orderconfirm = () => {
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const ShippingCharge = subtotal >= 500 ? 0 : 100;
    const tex = subtotal * 0.18;
    const amount = subtotal + ShippingCharge + tex;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country},${shippingInfo.pinCode}`;

    console.log(shippingInfo);

    const Proceedtopayment = async (amount) => {
        try {
            const { data: { key } } = await axios.get("http://localhost:4000/api/getkey");
            const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
                amount
            });

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Hiren hadiya",
                description: "Payment",
                image: "",
                order_id: order.id,
                callback_url: "http://localhost:4000/api/paymentverification",
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNO
                },
                notes: {
                    "address": address
                },
                theme: {
                    "color": "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };


    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    <div className='container-fuld bg-super'>
                        <MetaData title="Confirm order -- Hadiya-mart" />
                        <div className='container'>
                            <div className="row py-5 g-3">
                                <div className="col-lg-8 text-center text-md-start">
                                    <h3 className='mb-4'>Shipping info</h3>
                                    <p className='p-2 m-0'>Name : <span className='text-end'>{user.name}</span></p>
                                    <p className='p-2 m-0'>Phone: <span className='text-end'>{shippingInfo.phoneNo}</span></p>
                                    <p className='p-2 m-0'>Address : <span className='text-end'>{address}</span></p>

                                    <h3 className='py-5'>Your cart itams</h3>
                                    <div className="row rhite">
                                        {cartItems.map((val) => (
                                            <Cartitams
                                                key={val.id}
                                                val={val}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <h3>Order summary</h3>
                                    <hr />
                                    <div className="row">
                                        <div className="col-6 p-2">Sub total :</div>
                                        <div className="col-6 p-2 text-end">₹ {subtotal}</div>
                                        <div className="col-6 p-2">Shipping charge :</div>
                                        <div className="col-6 p-2 text-end">₹ {ShippingCharge}</div>
                                        <div className="col-6 p-2">G.S.T :</div>
                                        <div className="col-6 p-2 text-end">₹ {tex}</div>
                                        <hr />
                                        <div className="col-6 p-2 fw-bold">Total :</div>
                                        <div className="col-6 p-2 text-end">₹ {amount}</div>
                                        <hr />
                                    </div>
                                    <p className='fs-6 text-secondary'>Payment Type : Cash On Delivery</p>
                                    <button className='btn-outline-tomato px-6 py-1 my-3 mx-auto font1' onClick={() => Proceedtopayment(amount)}>PAY ₹ {amount}</button>
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
    );
};

export default Orderconfirm;
