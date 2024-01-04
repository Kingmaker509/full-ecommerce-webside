import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';
import Footer from '../../component/Footer';
import { useAlert } from 'react-alert';
import MetaData from '../../component/MetaData';
import Navlink from '../../component/Navlink';
import { clearErrors, deleteOrder, getAllOrders, updateOrder } from '../../actions/orderAction';
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const Adminproduct = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { error, orders } = useSelector(state => state.allOrders);
    const { error: deleteError, isDeleted, isUpdated} = useSelector((state) => state.order);
    const [status, setCategory] = useState();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success("order deleted");
            navigate("/admin/dashbord");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        if (isUpdated) {
            alert.success("order updated");
            navigate("/admin/dashbord");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getAllOrders());

    }, [dispatch, alert, error, isDeleted, navigate, deleteError, isUpdated]);

    const handleDeleteProduct = (id) => {
        dispatch(deleteOrder(id));
    }

    const updatrProduct = (e, id) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
        // alert.success("order updated successfuly")
    }
    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    {user.role === "admin" ? <>
                        <MetaData title={"Order list --Hadiya-mart"} />
                        <div className='container-fluid bg-super py-5'>
                            <div className='container py-5'>
                                <div class="row">
                                    <div class="col-md-2">
                                        <Navlink />
                                    </div>
                                    <div class="col-md-10">
                                        <div className='container ob'>
                                            <table className='table'>
                                                <thead>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>progress</th>
                                                    <th>Quantity</th>
                                                    <th>Shipping Address</th>
                                                    <th>Price</th>
                                                    <th>Edit progress</th>
                                                    <th>Delete</th>
                                                </thead>
                                                {orders && orders.map((item, ind) => (
                                                    <tbody key={ind}>
                                                        {item.orderItems.map((item) => (
                                                            <td key={item._id}>{item._id}</td>
                                                        ))}
                                                        {item.orderItems.map((item) => (
                                                            <td key={item._id}>{item.name}</td>
                                                        ))}
                                                        <td>{item.orderStatus}</td>
                                                        {item.orderItems.map((item) => (
                                                            <td key={item._id}>{item.quantity}</td>
                                                        ))}
                                                        <td key={item._id}>{item.shippingInfo.address}</td>
                                                     
                                                        <td>{item.totalPrice}</td>
                                                        <td><select id="" className=' mx-auto adinput my-2'
                                                            onChange={(e) => setCategory(e.target.value)}>
                                                            <option value="">select option</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="out of delevery">Out of delevery</option>
                                                            <option value="deleverd">Deleverd</option>
                                                        </select>
                                                            <button onClick={(e) => updatrProduct(e, item._id)} className='btn btn-outline-success'>Update</button>
                                                        </td>
                                                        <td><button onClick={() => handleDeleteProduct(item._id)} className='btn btn-outline-danger'>Delete</button></td>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : navigate("/")}
                </> : navigate("/login")}
            </>}
            <Footer />
        </>
    )
}

export default Adminproduct