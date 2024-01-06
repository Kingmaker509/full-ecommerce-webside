import React, { useState } from 'react'
import Footer from '../component/Footer'
import { clearErrors, getProduct } from '../actions/productActions';
import Loader from '../component/Loader';
import ProductCard from '../component/ProduCard'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../component/Search';
import Pagination from 'react-js-pagination';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useAlert } from 'react-alert'
import MetaData from '../component/MetaData';


const categorys = [
  "laptope",
  "man",
  "women",
  "phone",
  "footwere",
  "camera",
  "watch"
];


const Category = () => {

  const alert = useAlert();
  const params = useParams();
  const dispatch = useDispatch();
  const keyword = params.keyword;


  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products)
  const [price, setPrice] = useState([0, 25000])
  const [ratings, setRatings] = useState();
  const [category, setCategory] = useState();


  const priceHandler = (event, newprice) => {
    setPrice(newprice);
  }


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);


  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }


  return (
    <>
      {loading ? <Loader /> : <>

        <MetaData title={`products --Hadiyamart`} />

        <h3 className='text-center font3 reviews-hd p-2 my-4 mx-auto w-25'>Products</h3>

        <Search />

        {/* filteres */}

        <div className='container my-3'>
          <div className="row">
            <div className="col-8 mx-auto">
              <div>
                <Typography>
                  price
                </Typography>
                <br />
                <br />
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay='on'
                  aria-label='range-slider'
                  min={0}
                  max={25000}
                ></Slider>
                <Typography>Category</Typography>
                <ul>
                  {categorys.map((category) => (
                    <li className='cat-link' key={category} onClick={() => setCategory(category)}>{category}</li>
                  ))}
                </ul>
                <Typography >Ratings</Typography>
                <br />
                <br />
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-label='continuous-slider'
                  valueLabelDisplay='on'
                  min={0}
                  max={5}
                />
              </div>
            </div>
          </div>
        </div>


        {/* main content */}

        <div className='container'>
          <div className="row g-3 my-5">
            {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>

        {resultPerPage < productsCount && (
          <div className='paginationBox'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass='page-itam'
              linkClass='page-link'
              activeClass='pageItamActive'
              activeLinkClass='pageLinkActive'
            />
          </div>)}

      </>}
      <Footer />
    </>
  )
}

export default Category