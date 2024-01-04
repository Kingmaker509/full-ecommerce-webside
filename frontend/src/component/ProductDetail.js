import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from './Loader'
import { useAlert } from 'react-alert'
import MetaData from './MetaData';
import { addItemsToCart } from '../actions/cartActions';
import { NEW_REVIEW_RESET } from '../constants/productConstants';

const ProductDetail = () => {
    const { id } = useParams();

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const _id = params.id;

    const { product, loading, error } = useSelector((state) => state.productDetail);
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }

    const [quantity, setQuantity] = useState(1);

    const incrQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decrQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addTOCartHandler = () => {
        dispatch(addItemsToCart(_id, quantity));
        alert.success("Itam added to cart");
    }

    const submitReviewHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData()

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", _id);

        // Dispatch action to add review
        dispatch(newReview(myForm));

        // Clear form after submission
        setRating(0);
        setComment('');
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("review submit");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);



    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${product.name} --Hadiyamart`} />
                    <div className="bg-light">
                        <div className='container bg-light'>
                            <div className="row">
                                <div className='col-md-6 col-sm-12'>
                                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner m-auto p-5">
                                            {product.images && product.images.map((item, i) => (
                                                <div className={i === 0 ? "carousel-item active" : "carousel-item"} key={i}>
                                                    <img src={item.url} className='cimg' alt={`product-${i}`} />
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <div className='my-auto p-5'>
                                        <div className="row">
                                            <div className='col-md-12 col-sm-12'>
                                                <h2 className='my-3 text-center text-md-start font1'>{product.name}</h2>
                                            </div>
                                            <div className='col-md-12 col-sm-12 '>
                                                <p className='fw-light fs-7 text-center text-md-start font3'># {product._id}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <hr />
                                            <p className="card-text"> <ReactStars {...options} />
                                                <span className='font3 fs-6 text-secondary'> ({product.numOfReviews} Reviews)</span></p>
                                            <hr />
                                        </div>
                                        <div className='my-4 p-2'>
                                            <h1 className='tomato text-center text-md-start font1'>₹ {product.price}</h1>
                                        </div>
                                        <div className='h-40 text-center text-md-start'>
                                            <button className='btn btn-secondary' onClick={() => decrQuantity()}>-</button>
                                            <input readOnly className='inputnum' value={quantity} type="number" />
                                            <button className='btn btn-secondary' onClick={() => incrQuantity()}>+</button>
                                        </div>
                                        <div className='my-4 text-center text-md-start'>
                                            <button disabled={product.Stock < 1 ? true : false} onClick={() => addTOCartHandler()} className='btn btn-outline-tomato cart font1'>Add to cart <span><i class="fa-solid fa-cart-shopping spcart text-black"></i></span></button>
                                        </div>
                                        <div>
                                            <hr />
                                            <p className='text-center text-md-start'>
                                                Status:
                                                <b className={product.Stock < 1 ? "red font3" : "green font3"}>
                                                    {product.Stock < 1 ? "Out of stok" : "In stok"}
                                                </b>
                                            </p>
                                            <hr />
                                        </div>
                                        <div className='border p-3'>
                                            Description: <p className='font2'>{product.description}</p>
                                        </div>


                                        <div className=" my-4">
                                            <h5 className='font3 fw-bold'>Submit Your Review</h5>
                                            <form onSubmit={submitReviewHandler}>
                                                <div className="form-group">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        value={rating}
                                                        onChange={(newRating) => setRating(newRating)}
                                                        id="rating"
                                                    />
                                                </div>
                                                <div className="form-group ">
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        placeholder="Write your review..."
                                                        id="comment"
                                                        className='textarea'
                                                    ></textarea>
                                                </div>
                                                <div className='my-1 text-center text-md-start'>
                                                    <button className='btn btn-outline-secondary'>
                                                        submit Reviews
                                                    </button>
                                                </div>
                                            </form>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className='text-center font3 reviews-hd p-2 mx-auto w-25'>Reviews</h3>
                        {product.reviews && product.reviews[0] ? (
                            <div className='row  mx-0 g-3 px-5 ob'>
                                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                            </div>
                        ) : (
                            <p className='text-center text-md-start my-4'> No reviews yet</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetail;
