// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// // import { useAlert } from 'react-alert';
// import Loader from '../../component/Loader';
// import MetaData from '../../component/MetaData';
// import Footer from '../../component/Footer';
// import Navlink from '../../component/Navlink';
// import { useEffect } from 'react';
// import { getOrderDetails } from '../../actions/orderAction';

// const Updateorder = () => {
//     const navigate = useNavigate();
//     // const alert = useAlert();
//     const dispatch = useDispatch();
//     const params = useParams();
//     const id = params.id;

//     const { loading, isAuthenticated, user } = useSelector(state => state.user);
//     // const { error, orders } = useSelector(state => state.orderDetails);
//     // const { error: deleteError, isDeleted } = useSelector((state) => state.order);
//     const { orders } = useSelector(state => state.allOrders);




//     useEffect(() => {


//         dispatch(getOrderDetails(id))
//     }, [dispatch, id])


//     return (
//         <>
//             {loading ? <Loader /> : <>
//                 {isAuthenticated ? <>
//                     {user.role === "admin" ? <>
//                         <MetaData title={"Update Order --Hadiya-mart"} />
//                         <div className='container-fluid bg-super py-5'>
//                             <div className='container py-5'>
//                                 <div class="row">
//                                     <div class="col-md-2">
//                                         <Navlink />
//                                     </div>
//                                     <div class="col-md-10">
//                                         <div className='container'>
//                                             <div className="row py-5 g-3">
//                                                 <div className="col-lg-8 text-center text-md-start">
//                                                     <h3 className='mb-4'>Shipping info</h3>
//                                                     {orders.find((id) => (
//                                                         id.shippingInfo.map((item) => (
//                                                             <p key={item.state} className='p-2 m-0'>Name : <span className='text-end'>{item.address}</span></p>
//                                                         ))
//                                                     ))}

//                                                     {/* <p className='p-2 m-0'>Phone: <span className='text-end'>{shippingInfo.phoneNO}</span></p> */}
//                                                     {/* <p className='p-2 m-0'>Address : <span className='text-end'>{address}</span></p> */}
//                                                 </div>

//                                                 <h3 className='py-5'>Your cart itams</h3>
//                                                 <div className="row rhite">
//                                                     <table className='table'>
//                                                         <thead>
//                                                             <th>Id</th>
//                                                             <th>Name</th>
//                                                             <th>Quantity</th>
//                                                             <th>Price</th>
//                                                         </thead>
//                                                         {orders && orders.map((item, ind) => (
//                                                             <tbody key={ind}>
//                                                                 {item.orderItems.map((item) => (
//                                                                     <td key={item._id}>{item._id}</td>
//                                                                 ))}
//                                                                 {item.orderItems.map((item) => (
//                                                                     <td key={item._id}>{item.name}</td>
//                                                                 ))}
//                                                                 {item.orderItems.map((item) => (
//                                                                     <td key={item._id}>{item.quantity}</td>
//                                                                 ))}
//                                                                 <td>{item.totalPrice}</td>
//                                                             </tbody>
//                                                         ))}
//                                                     </table>
//                                                 </div>
//                                             </div>
//                                             <div className='col-lg-4'>

//                                                 <button className='btn-outline-tomato px-6 py-1 my-3 mx-auto font1'>process</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </> : navigate("/")}
//                 </> : navigate("/login")}
//             </>}
//             <Footer />
//         </>
//     )
// }

// export default Updateorder