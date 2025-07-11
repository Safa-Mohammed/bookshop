import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './Modules/AuthModule/Login/Login';
import AuthLayout from './Modules/AuthModule/AuthLayout/AuthLayout';
import NotFound from './Modules/AuthModule/NotFound/NotFound';
import MasterLayout from './Modules/AuthModule/MasterLayout/MasterLayout';
 import AuthContextProvider from "./context/authContext";

import { ToastContainer } from 'react-toastify';
import Register from './Modules/AuthModule/Register/Register';
import ForgetPassword from './Modules/AuthModule/ForgetPassword/ForgetPassword';
import ResetPassword from './Modules/AuthModule/ResetPassword/ResetPassword';
import ChangePassword from './Modules/AuthModule/ChangePassword/ChangePassword';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'; 
import Categories from './Modules/HomeModule/components/Home/Categories/Categories';
import ProductListingPage from './Modules/HomeModule/components/Home/ListProdcut/ListProduct';
import Dashboard  from './Modules/HomeModule/Dashbored';
import Cart from './Modules/HomeModule/components/Home/Cart/Cart';
import AboutUs from './Modules/HomeModule/components/Home/About/AboutUs';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Confirm from './Modules/HomeModule/components/Home/Confirm/Confirm';
import ContactUs from './Modules/HomeModule/components/Home/ContactUs/contactUs';
import CategoriesData from './Modules/HomeModule/components/Home/Categories/CategoriesData';
import BookDetailsPage from './Modules/HomeModule/components/Home/bookData/bookData';
 



const stripe= loadStripe ('pk_test_qblFNYngBkEdjEZ16jxxoWSM')

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'change-password', element: <ChangePassword /> }
      ]
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'home', element: <Dashboard /> },
         { path: 'about', element: <AboutUs /> },
         { path: 'contact', element: <ContactUs/> }, 
         { path: 'category', element: <Categories/> },
           { path: 'categorydata', element: <CategoriesData/> },
          { path: 'list-product', element: <ProductListingPage/>},
          { path: 'cart', element: <Cart/>}, 
          { path: 'confirm', element: <Confirm/>}, 
          { path: 'book-data/:id', element: <BookDetailsPage/>}
      ],
    }
  ]);

  return (
    <>
        <Elements stripe={stripe}>
    <AuthContextProvider>
      <ToastContainer position="top-right" autoClose={5000} />
      <RouterProvider router={routes} />
    </AuthContextProvider>
  </Elements>
    </>
  );
}

export default App;