import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../component/Loader';
import Footer from '../component/Footer';
import { logout } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../component/MetaData';
import Error from './Error';
import { myOrders } from '../actions/orderAction';
import OrderTable from '../component/OrderTable';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, isAuthenticated, user } = useSelector(state => state.user);
  const { orders, error } = useSelector((state) => state.myOrders);


  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);


  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
    alert.success("LOgout successfully")
  }

  const admingo = () => {
    navigate("/admin/dashbord");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated && user ? (
          <>
            <MetaData title={`${user.name}'s Profile`} />
            <div className='container-fluid bg-super'>
              <div className='container py-5'>
                <div className="row g-3 py-5">
                  <div className="col-md-6 col-sm-12 text-center">
                    <img src={user.avatar.url ? user.avatar.url : "/photo.png"} className='img-fluid profile2 obj-fit' alt="profile" />
                  </div>
                  <div className="col-md-6 col-sm-12 pt-3 text-center text-md-start">
                    <h3 className='tomato fw-bold font1'>{user.name}</h3>
                    <p className='fs-7 font3 text-secondary'>#{user._id}</p>
                    <h5 className='font1'>{user.email}</h5>
                    <div className="row">
                      <div className='col-4'><button className='btn-outline-tomato text-center py-2 bg-white px-4  w-90 font1' onClick={() => logoutUser()}><i className="fas fa-sign-out-alt"></i> logout</button></div>
                    </div>
                  </div>
                  <div className="col-12">
                    {user.role === "admin" ? <>
                      <div className='col-4'><button className='btn-outline-tomato text-center py-2 ms-5 my-2 px-4  w-90 font1' onClick={() => admingo()}>Admin panal</button></div>
                    </> : ""}
                    {orders ? <>
                      <div className='container mt-5 pt-5'>
                        <div className="row">
                          <h3 className='text-center font3 reviews-hd p-2 my-4 mx-auto w-25'>Orders</h3>
                          <div className="col-12">
                            <div className='container ob'>
                              <table className='table'>
                                <thead>
                                  <th className='t1'>Image</th>
                                  <th className='t2'>Id</th>
                                  <th className='t3'>Name</th>
                                  <th className='t4'>Price</th>
                                  <th className='t5'>Progress</th>
                                </thead>
                                {orders.map((val, ind) => <OrderTable key={ind} val={val} od={val.orderStatus} bmw={val.totalPrice} />)}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </> : <></>}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        ) : (<> <Error /></>)

      )}
    </>
  );
};

export default Account;
