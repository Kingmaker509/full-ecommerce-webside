import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/Footer';
// import { Doughnut, Line } from 'react-chartjs-2'
import { getAdminProduct } from '../../actions/productActions';
import MetaData from '../../component/MetaData';
import Navlink from '../../component/Navlink';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

const Dashbord = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers)

    let outOfStok = 0;
    let inStok = products.length - outOfStok;

    let totalAmount = 0;
    orders && orders.forEach(item =>{
        totalAmount+=item.totalPrice
    })

    products && products.forEach(item => {
        if (item.Stock === 0) {
            outOfStok += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders())
        dispatch(getAllUsers())
    }, [dispatch]);

    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    {user.role === "admin" ? <>
                        <MetaData title={"Admin dashbord --Hadiya-mart"} />
                        <div className='container-fluid bg-super'>
                            <div className='container py-5'>
                                <div class="row">
                                    <div class="col-md-2 mt-5 pt-5">
                                        <Navlink />
                                    </div>
                                    <div class="col-md-10">
                                        <h3 className='text-center font3 reviews-hd p-2 my-4 mx-auto w-25'>Dashbord</h3>
                                        <div className="container">
                                            <div className='amo p-3 '>
                                                <h5 className='text-center white'>Total Amount</h5>
                                                <h5 className='text-center white'>₹ {totalAmount}</h5>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-4 curcul1">
                                                    <div className='curcul'>
                                                        <h5 className='text-center p-0 m-0'>Product</h5>
                                                        <p className='text-center'>{products.length + outOfStok}</p>
                                                    </div>
                                                </div>
                                                <div className="col-4 curcul1">
                                                    <div className='curcul'>
                                                        <h5 className='text-center p-0 m-0'>Order</h5>
                                                        <p className='text-center'>{orders && orders.length}</p>
                                                    </div>
                                                </div>
                                                <div className="col-4 curcul1">
                                                    <div className='curcul'>
                                                        <h5 className='text-center p-0 m-0'>Users</h5>
                                                        <p className='text-center'>{users && users.length}</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 my-5">
                                                    <div class="card">
                                                        <div class="card-body shadow p-5">
                                                            <h5 class="card-title text-center p-2">Total seals</h5>
                                                            <p class="card-text text-center p-2">₹ {totalAmount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 m-auto">
                                                    <div class="card">
                                                        <div class="card-body shadow">
                                                            <h5 class="card-title text-center p-2">Stok</h5>
                                                            <p class="card-text text-center p-2">In stok : {inStok}</p>
                                                            <p class="card-text text-center p-2">Out of stok : {outOfStok}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : navigate("/")}
                </> : navigate("/login")}
                <Footer />
            </>}
        </>
    )
}

export default Dashbord