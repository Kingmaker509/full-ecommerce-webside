import React from 'react'
import { Link } from 'react-router-dom'

const Cartitams = ({ val, deleteCartItemHandler }) => {
  return (
    <>
      <div className='col-6 d-flex my-3'>
        <img src={val.image} alt="product" className='img-fluid cartimg' />
        <div className=' d-flex flex-column px-5'>
          <Link to={`/product/${val.product}`} className='text-decoration-none text-dark'>{val.name}</Link>
          <p className='m-0 font3 fw-bold'>{`₹${val.price}`}</p>
          <p className='tomato m-0 pointer' onClick={() => deleteCartItemHandler(val.product)}>remove</p>
        </div>
      </div>
      <div className='col-3 text-center my-2'>
        <p>{val.quantity}</p>
      </div>
      <div className='col-3 text-end my-2 font3 fw-bold'>{`${val.price * val.quantity}`}</div>
    </>
   
  )
}

export default Cartitams