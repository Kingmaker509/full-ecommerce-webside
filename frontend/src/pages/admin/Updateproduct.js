import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../component/Loader';
import MetaData from '../../component/MetaData';
import { useAlert } from 'react-alert';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import Footer from '../../component/Footer';
const Updateproduct = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { error: updateError, isUpdated } = useSelector(state => state.product);
    const { error, product } = useSelector(state => state.productDetail);

    console.log(product);

    const id = params.id;
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [image, setImage] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const categorys = [
        "laptope",
        "man",
        "women",
        "phone",
        "footwere",
        "camera"
    ];


    const creatProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImage([]);
        setImagePreview([]);
        setOldImages([])

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview((prev) => [...prev, reader.result]);
                    setImage((prev) => [...prev, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };


    const createProductHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        image.forEach((file, index) => {
            myForm.append(`images[${index}]`, file);
        });
        dispatch(updateProduct(id, myForm));

    };

    useEffect(() => {

        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product update successfully")
            dispatch({ type: UPDATE_PRODUCT_RESET });
            navigate("/admin/dashbord");
        }
    }, [dispatch, alert, error, navigate, isUpdated, id, product, updateError]);

    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    {user.role === "admin" ? <>
                        <MetaData title={"New product --Hadiya-mart"} />

                        <div className='container-fluid bg-super py-5'>
                            <div className="container">
                                <h3 className='text-center font3 reviews-hd p-2 my-4 mx-auto w-25'>Add New Products</h3>
                                <div className="row">
                                    <div className='col-lg-6 col-10 mx-auto'>
                                        <form onSubmit={(e) => createProductHandler(e)} className='bg-white p-3 d-flex justify-content-center align-content-center flex-column rounded-3'>
                                            <input type="text"
                                                className='w-90 mx-auto adinput my-2'
                                                placeholder='Name...'
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <input type="number"
                                                className='w-90 mx-auto adinput my-2'
                                                placeholder='₹ price...'
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className='w-90 mx-auto adinput my-2'
                                                placeholder='Description...'
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <select value={category} className='w-90 mx-auto adinput my-2' required
                                                onChange={(e) => setCategory(e.target.value)}>
                                                <option value="">Coose Category</option>
                                                {categorys.map((cate) => (
                                                    <option value={cate} key={cate}>{cate}</option>
                                                ))}
                                            </select>
                                            <input type="number"
                                                className='w-90 mx-auto adinput my-2'
                                                placeholder='Stock...'
                                                required
                                                value={Stock}
                                                onChange={(e) => setStock(e.target.value)}
                                            />
                                            <div>
                                                <input
                                                    className='mx-4 my-2 '
                                                    type="file"
                                                    name='avatar'
                                                    accept='image/*'
                                                    required
                                                    multiple
                                                    onChange={creatProductImagesChange}
                                                />
                                            </div>
                                            <div className='w-90 mx-auto p-1'>
                                                {oldImages &&
                                                    oldImages.map((image, ind) => (
                                                        <img key={ind} src={image.url} alt='' className='img-fluid adimgpre' />
                                                    ))}
                                            </div>
                                            <div className='w-90 mx-auto p-1'>
                                                {imagePreview &&
                                                    imagePreview.map((image, ind) => (
                                                        <img key={ind} src={image} alt='' className='img-fluid adimgpre' />
                                                    ))}
                                            </div>
                                            <button type='submit' className='btn-outline-tomato text-center py-1 my-4 w-90 mx-4 font1'>
                                                {loading ? (
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                ) : (
                                                    'Submit'
                                                )}
                                            </button>
                                        </form>
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

export default Updateproduct