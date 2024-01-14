import './App.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Category from './pages/Category.js';
import Nav from './component/Nav.js';
import Error from './pages/Error.js';
import ProductDetail from './component/ProductDetail.js';
import Search from './component/Search.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import store from './store.js';
import { loadUser } from './actions/userAction.js';
import Account from './pages/Account.js';
import Cart from './pages/Cart.js';
import Shipping from './pages/Shipping.js';
import Orderconfirm from './pages/Orderconfirm.js';
import Dashbord from './pages/admin/Dashbord.js';
import Adminproduct from './pages/admin/Adminproduct.js';
import Newproduct from './pages/admin/Newproduct.js';
import Updateproduct from './pages/admin/Updateproduct.js';
import Adminorder from './pages/admin/Adminorder.js';
import Updateorder from './pages/admin/Updateorder.js';
import Userlist from './pages/admin/Userlist.js';
import Paymentsuccess from './pages/Paymentsuccess.js';




function App() {

  store.dispatch(loadUser());

  // window.addEventListener("contextmenu",(e) => e.preventDefault());
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Category />} />
          <Route path='/products/:keyword' element={<Category />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/ragister' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<Orderconfirm />} />
          <Route path='paymentsuccess' element={<Paymentsuccess />} />
          <Route path='/admin/dashbord' element={<Dashbord />} />
          <Route path='/admin/product' element={<Adminproduct />} />
          <Route path='/admin/newproduct' element={<Newproduct />} />
          <Route path='/admin/product/:id' element={<Updateproduct />} />
          <Route path='/admin/order' element={<Adminorder />} />
          <Route path='/admin/order/:id' element={<Updateorder />} />
          <Route path='/admin/useres' element={<Userlist />} />


          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;






//7600420470