import React from 'react'
import MetaData from '../component/MetaData'
import Cartitams from '../component/Cartitams'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../component/Footer'
import { removeItemsFromCart } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import Loader from '../component/Loader'

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated, user, loading } = useSelector(state => state.user);

    const deleteCartItemHandler = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const shipingHandler = () => {
        if (isAuthenticated) {
            navigate("/shipping");
        } else {
            navigate("/login")
        }
    }
    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    <MetaData title={`cart --Hadiya-mart`} />
                    <div className='container py-5'>
                        <div className="row  ">
                            <div className="col-6 bg-tomato">
                                <h4>Product</h4>
                            </div>
                            <div className="col-3 bg-tomato text-center">
                                <h4>Quantity</h4>
                            </div>
                            <div className="col-3 bg-tomato text-end">
                                <h4>Total</h4>
                            </div>
                            {cartItems.map((val) => (
                                <Cartitams
                                    key={val.id}
                                    val={val}
                                    deleteCartItemHandler={deleteCartItemHandler}
                                />
                            ))}
                            <div className='col-12 my-3 py-3 text-end gtotal font1'>
                                Total = <span className='font3 fw-bold'>{` ₹ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`} </span> <br />
                            </div>
                            <div className='col-12 text-center text-md-end gtotal font1'>
                                <button onClick={() => shipingHandler()} className='sform mt-3 px-6 py-2 px-md-4 py-md-1'>chek out</button>
                            </div>
                        </div>
                    </div>
                </> : navigate("/login")}
            </>}
            <Footer />
        </>
    )
}

export default Cart