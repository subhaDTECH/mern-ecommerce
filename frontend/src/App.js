import './App.css';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/layout/Home/Home';

import Footer from './components/layout/Footer/Footer';
import ProductDetail from "./components/layout/Home/ProductDetail.js";
import LoginSignup from './components/user/LoginSignup.js';
import store from './store';
import {useEffect} from "react";
import {LoadUser} from "./actions/userAction.js"
import {useDispatch,useSelector} from "react-redux"
import UserOptions from './components/layout/Header/UserOptions';
import ProfileUser from "./components/user/ProfileUser"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import UpdateUserPass from './components/user/UpdateUserPass';
import ResetPasswordEmail from './components/user/ResetPasswordEmail';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/layout/cart/Cart';
import Shipping from './components/layout/cart/Shipping';
import OrderConfirm from './components/layout/cart/OrderConfirm';
import OrderSuccess from "./components/layout/cart/OrderSuccess";
import MyOrder from './components/layout/cart/MyOrder'; 
import Search from './components/layout/Home/Search';
import ProductList from './components/layout/Home/ProductList';
import Products from './components/layout/Home/Products';
import UpdateProfile from './components/user/UpdateProfile';
import DashboardPage from "./components/Admin/DashboardPage"
import DashboardUserPage from './components/Admin/DashboardUserPage';
import DashboardProductPage from './components/Admin/DashboardProductPage';
import  DashboardOrderPage from './components/Admin/DashboardOrderPage'; 
import AboutPage from './components/layout/Home/AboutPage ';
import ContactPage from './components/layout/Home/ContactPage';

function App() {
  const dispatch=useDispatch();
  const userData=useSelector((state)=>state.user);
  const {error,loading,isAuthentication,user}=userData;

  useEffect(()=>{
    // store.dispatch(LoadUser());
    dispatch(LoadUser());
    if(error){
      alert("error");
     
    }

  },[])



  window.addEventListener('contextmenu',(e)=>e.preventDefault());
  return (
    <>
     <Router>
        <Header/>
        {
          isAuthentication && <UserOptions user={user} />
        }
         <Routes>
           <Route path="/" caseSensitive={false} element={<Home />} />
           <Route path="/about" exact caseSensitive={false} element={<AboutPage/>} />
           <Route path="/contact" exact caseSensitive={false} element={<ContactPage/>} />
           <Route path="/search" exact caseSensitive={false} element={<Search />} />
           <Route path="/products" exact caseSensitive={false} element={<Products />} />
           <Route path="/products/:keyword" exact caseSensitive={false} element={<Products />} />
           <Route path="/product/:id" exact caseSensitive={false} element={<ProductDetail />} />
           <Route path="/login" exact caseSensitive={false} element={<LoginSignup />} />
           <Route path="/me/orders" exact caseSensitive={false} element={<MyOrder />} />
           <Route path="/me/update" exact caseSensitive={false} element={<UpdateProfile />} />
           
          <Route path="/account" exact caseSensitive={false} element={<ProfileUser />} />
          <Route path="/password/update" exact caseSensitive={false} element={<UpdateUserPass/>} />
          <Route path="/password/forgot" exact caseSensitive={false} element={<ResetPasswordEmail/>} />
          <Route path="/password/reset/:token" exact caseSensitive={false} element={<ResetPassword/>} />
        
          <Route path="/cart" exact caseSensitive={false} element={<Cart/>} />
          <Route path="/shipping" exact caseSensitive={false} element={<Shipping/>} />
          

          {
            isAuthentication && <Route path="/order/confirm" exact caseSensitive={false} element={<OrderConfirm/>}/>
          }
          
          
          <Route path="/order/success" exact caseSensitive={false} element={<OrderSuccess/>} />





          {
           isAuthentication && user?.role==="admin" && <Route path="/admin/dashboard" exact caseSensitive={false} element={<DashboardPage/>} />
          }

          {
           isAuthentication && user?.role==="admin" && <Route path="/admin/dashboard/users" exact caseSensitive={false} element={<DashboardUserPage/>} />
          }
          {
           isAuthentication && user?.role==="admin" && <Route path="/admin/dashboard/products" exact caseSensitive={false} element={<DashboardProductPage/>} />
          }
          {
           isAuthentication && user?.role==="admin" && <Route path="/admin/dashboard/orders" exact caseSensitive={false} element={<DashboardOrderPage/>} />
          }
         
          
          
          
          <Route path="*" caseSensitive={false} element={<LoginSignup/>} />
        </Routes>
        <Footer/>
      </Router>
          
   </>
  );
}

export default App;

//rzp_test_xH7BzsGVEGu2jB
//SCObw5DcQ8zyWZ1CqZzTXnGb
