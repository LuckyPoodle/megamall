
import React, { useEffect,lazy,Suspense } from "react";

import { auth } from "./firebase.js";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Switch, Route } from "react-router-dom";
import Annoucement from 'react-announcement';
import { ToastContainer } from "react-toastify";
import trustyproducer from"../src/assets/trusty-producer.png";
const Login =lazy(()=>import ("./pages/auth/Login"));
const Register=lazy(()=>import( "./pages/auth/Register"));
const Home =lazy(()=>import("./pages/Home"));
const Header =lazy(()=>import('./components/nav/Header'));

const RegisterComplete =lazy(()=>import('./pages/auth/registerComplete'));
const ForgotPassword =lazy(()=>import("./pages/auth/ForgotPassword"));
const History =lazy(()=>import("./pages/user/History"));
const Product=lazy(()=>import("./pages/Product"));
const CategoryHome=lazy(()=>import("./pages/category/CategoryHome"));
const SubHome=lazy(()=>import("./pages/subs/SubHome"));

const UserRoute=lazy(()=>import( "./components/routes/UserRoute"));
const AdminRoute=lazy(()=>import( "./components/routes/AdminRoute"));
const Password=lazy(()=>import( "./pages/user/Password"));
const Wishlist =lazy(()=>import("./pages/user/Wishlist"));
const AdminDashboard=lazy(()=>import( "./pages/admin/AdminDashboard"));
const CategoryCreate=lazy(()=>import( "./pages/admin/category/CategoryCreate"));
const CategoryUpdate=lazy(()=>import( "./pages/admin/category/CategoryUpdate"));
const SubCreate=lazy(()=>import( "./pages/admin/sub/SubCreate"));
const SubUpdate =lazy(()=>import("./pages/admin/sub/SubUpdate"));

const NotFound=lazy(()=>import("./components/404/notfound.component"))
const ProductCreate =lazy(()=>import("./pages/admin/product/ProductCreate"));

const AllProducts=lazy(()=>import( "./pages/admin/product/AllProducts"));

const ProductUpdate=lazy(()=>import( "./pages/admin/product/ProductUpdate"));


const Shop=lazy(()=>import( "./pages/Shop"));
const Cart=lazy(()=>import( "./pages/Cart"));
const SideDrawer =lazy(()=>import('./components/drawer/SideDrawer'));
const Checkout=lazy(()=>import( "./pages/Checkout"));
const CreateCouponPage =lazy(()=>import("./pages/admin/coupon/CreateCouponPage"));
const Payment =lazy(()=>import("./pages/Payment"));
const App = () => {


  const dispatch = useDispatch();
  

  useEffect(() => {

    //so once info retrieved,clean up the state to prvent memory leak
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
     


        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                wishlist:res.data.wishlist
              },
            })
        
           
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);


  return (
    <Suspense fallback={
      <div className="col text-center p-5">

      Store is loading 
      <br>
      </br>
      <LoadingOutlined />

      </div>
    }>
      <Annoucement
        title="Sample full stack Ecommerce Website built with React JS, Express ,Mongoose, MongoDB"
        subtitle="with various functionalities for both Admin and User roles"
        imageSource={trustyproducer}
        daysToLive={1} />
      <ToastContainer />
      <Header />
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />

        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />

        <Route exact path="/shop" component={Shop} />

        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />
        <Route render={()=><NotFound msg='This page does not exist...perhaps a dog ate it'/>}/> 
      </Switch>
    </Suspense>
  );
};

export default App;
