import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import MetaData from '../component/MetaData';
import CheckoutOrder from '../component/Checkoutorder';
import Footer from '../component/Footer';
import Cartitams from '../component/Cartitams';
import {  createOrder } from '../actions/orderAction';
import { useAlert } from 'react-alert';

const Orderconfirm = () => {
    const navigat = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    // const { error } = useSelector(state => state.newOrder);


    const subtotal = cartItems.reduce((acc, itam) => acc + itam.quantity * itam.price, 0);

    const ShippingCharge = subtotal >= 500 ? 0 : 100;

    const tex = subtotal * 0.18;

    const totalprice = subtotal + ShippingCharge + tex;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country},${shippingInfo.pincode}`


    // useEffect(() => {
    //   if (error) {
    //     alert.error(error);
    //     dispatch(clearErrors());
    //   }
    // }, [dispatch,error,alert]);

    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:subtotal,
        texPrice:tex,
        shippingPrice:ShippingCharge,
        totalPrice: totalprice,
        // pinCode: shippingInfo.pincode,
        // phoneNo:shippingInfo.phoneNO
    }
    

    const Proceedtopayment = () => {

        //active when online payment started

        // const data = {
        //     subtotal,
        //     ShippingCharge,
        //     tex,
        //     totalprice
        // }
        // sessionStorage.setItem("orderInfo",JSON.stringify(data));

        // navigat("/process/payment");


        dispatch(createOrder(order));
        navigat("/");
        alert.success("order placed")

    }

    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    <div className='container-fuld bg-super'>
                        <MetaData title="Confirm order -- Hadiya-mart" />

                        <CheckoutOrder />
                        <div className='container'>
                            <div className="row py-5 g-3">
                                <div className="col-lg-8 text-center text-md-start">
                                    <h3 className='mb-4'>Shipping info</h3>
                                    <p className='p-2 m-0'>Name : <span className='text-end'>{user.name}</span></p>
                                    <p className='p-2 m-0'>Phone: <span className='text-end'>{shippingInfo.phoneNO}</span></p>
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
                                        <div className="col-6 p-2 text-end">₹ {totalprice}</div>
                                        <hr />
                                    </div>
                                    <p className='fs-6 text-secondary'>Payment Type : Cash On Delivery</p>
                                    <button className='btn-outline-tomato px-6 py-1 my-3 mx-auto font1' onClick={() => Proceedtopayment()}>PAY ₹ {totalprice}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <>
                    {navigat("/login")}
                </>}
            </>}
            <Footer />
        </>
    )
}

export default Orderconfirm