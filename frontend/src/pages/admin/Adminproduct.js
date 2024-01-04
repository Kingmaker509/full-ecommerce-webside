import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';
import Footer from '../../component/Footer';
import { useAlert } from 'react-alert';
import { clearErrors, getAdminProduct, deleteProduct as deleteProductAction } from '../../actions/productActions';
import MetaData from '../../component/MetaData';
import Navlink from '../../component/Navlink';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const Adminproduct = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

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
            alert.success("product deleted");
            navigate("/admin/dashbord");
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProduct());

    }, [dispatch, alert, error, isDeleted, navigate, deleteError]);

    const handleDeleteProduct = (id) => {
        dispatch(deleteProductAction(id)); 
    }

    const updatrProduct = (id) => {
        navigate(`/admin/product/${id}`);
    }
    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    {user.role === "admin" ? <>
                        <MetaData title={"Update product --Hadiya-mart"} />
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
                                                    <th>Stok</th>
                                                    <th>Price</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </thead>
                                                {products && products.map((item, ind) => (
                                                    <tbody key={ind}>
                                                        <td>{item._id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.Stock}</td>
                                                        <td>{item.price}</td>
                                                        <td><button onClick={() => updatrProduct(item._id)} className='btn btn-outline-success'>Edit</button></td>
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


