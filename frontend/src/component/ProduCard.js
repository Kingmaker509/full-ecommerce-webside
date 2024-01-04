import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';




const ProductCard = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
 

    return (
        <>
            <div className="col-md-4 col-sm-6 my-3">
                <Link className='text-decoration-none' to={`/product/${product._id}`}>
                    <div className="card shadow">
                        <img src={product.images[0].url} className="pimg obj-fit" alt="blue tshart" />
                        <div className="card-body">
                            <h5 className="card-title font1">{product.name}</h5>
                            <p className="card-text"> <ReactStars {...options} /> <span className='font3 fw-bold tomato'>
                            ({product.numOfReviews} Reviews)</span></p>
                            <p className='card-text font3 fw-bold tomato'>{` ₹ ${product.price}`}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ProductCard