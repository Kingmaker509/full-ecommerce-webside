import React, { useEffect } from 'react'
import Footer from '../component/Footer'
import ProductCard from '../component/ProduCard'
import MetaData from '../component/MetaData';
import { clearErrors, getProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader';
import { useAlert } from 'react-alert'
import Search from '../component/Search';
import { Link } from 'react-router-dom';



function Home() {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);





  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <MetaData title="Hadiya-mart" />
          <Search />

          <h1 className='font1 mt-5 text-center text-secondary'>Welcome to <b className='font1 tomato'> Hadiya-mart </b></h1>

          <div className="text-center">
            <Link to="/products">
              <img src="https://img.freepik.com/free-vector/fashion-sale-landing-page_23-2148609266.jpg" className='img-fluid main-background' alt="" />
            </Link>
          </div>


          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="d-block imag1" />
              </div>
              <div class="carousel-item">
                <div class="d-block imag2" />
              </div>
              <div class="carousel-item">
                <div class="d-block imag3" />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <div className='container'>
            <div className="row g-3 my-5">
              <h3 className='text-secondary text-center'>Tranding on</h3>
              <hr />
              {products && products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <img src="https://www.turnersjewelers.com/wp-content/uploads/2020/06/rolex-banner.jpg" className='img-fluid my-4' alt="postar 1" />


        </>
      )}
      <Footer />
    </>
  );
}

export default Home