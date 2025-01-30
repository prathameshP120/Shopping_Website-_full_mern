import React from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import Productdetails from "../product/Productdetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import MyOrders from "../order/MyOrder";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/invoice";

const useUserRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} key="/" />,
      <Route
        path="/product/:id"
        element={<Productdetails />}
        key="/product/:id"
      />
      ,
      <Route path="/login" element={<Login />} key="/login" />,
      <Route path="/register" element={<Register />} key="/register" />,
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
        key="/cart"
      />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        key="/me/profile"
      />
      <Route
        path="/me/update_profile"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
        key="/me/update_profile"
      />
      <Route
        path="/me/upload_avatar"
        element={
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        }
        key="/me/upload_avatar"
      />
      <Route
        path="/me/update_password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
        key="/me/update_password"
      />
      <Route
        path="/password/forgot"
        element={<ForgotPassword />}
        key="/password/forgot"
      />
      ,
      <Route
        path="/password/reset/:token"
        element={<ResetPassword />}
        key="/password/reset/:token"
      />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
        key="/shipping"
      />
      <Route
        path="/confirm_order"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
        key="/confirm_order"
      />
      <Route
        path="/payment_method"
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
        key="/payment_method"
      />
      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
        key="/me/orders"
      />
      <Route
        path="/me/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
        key="/me/order/:id"
      />
      <Route
        path="/invoice/order/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
        key="/invoice/order/:id"
      />
      {/*
       */}
      {/*
      ,
     
      ,
    
      ,
   
      ,
   
      ,
   
  
      ,
    
      ,
  
      ,
      <Route
        path="/invoice/order/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
        key="/invoice/order/:id"
      /> */}
    </>
  );
};

export default useUserRoutes;
