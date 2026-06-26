import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../features/home/screen/Home';
import Service from '../features/service/screen/Service';
import SignupScreen from '../features/auth/screen/SignupScreen';
import SignInScreen from '../features/auth/screen/SignInScreen';

import AboutUs from '../features/about/screen/AboutUs';
import Product from '../features/product/screen/Product';
import Contact from '../features/contact/screen/Contact';

import CreateProducts from '../features/createProducts/screen/CreateProducts';
import Cart from '../features/addCart/screen/cart';
import Wishlist from '../features/wishlist/screen/Wishlist';
import Profile from '../features/profile/screen/Profile';
// import CreateProducts from '../features/createProducts/screen/CreateProducts';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      /* --- Public Endpoints --- */

      {
        path: '/signup',
        element: <SignupScreen />,
      },
      {
        path: '/login', // 💡 FIX: Moved outside the ProtectedRoute wrapper
        element: <SignInScreen />,
      },

      /* --- Protected Guard Area --- */
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/home',
            element: <Home />,
          },
          {
            path: '/about-us',
            element: <AboutUs />,
          },
          {
            path: '/service',
            element: <Service />,
          },
          {
            path: '/product',
            element: <Product />,
          },
          {
            path: '/contact-us',
            element: <Contact />,
          },
          {
            path: '/add-product',
            element: <CreateProducts />,
          },
          {
            path: '/cart',
            element: <Cart />,
          },
          {
            path: '/wishlist',
            element: <Wishlist />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },

      /* --- Catch-All Fallback Route --- */
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
