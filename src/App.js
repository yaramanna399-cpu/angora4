import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartContextProvider } from './Context/CartContext'; 
import TokenContextProvider from './Context/TokenContext'; 
// التعديل هنا: بنستورد الـ Provider من صفحة الـ Wishlist
import { WishlistProvider } from './Pages/Wishlist'; 
import Layout from './Components/Layout'; 
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register'; 
import Notfound from './Pages/Notfound';
import Contact from './Pages/Contact'; 
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Address from './Pages/Address'; 
import Wishlist from './Pages/Wishlist'; // الـ default export هو الصفحة
import Categories from './Pages/Categories';
import CategoryDetails from './Pages/CategoryDetails';
import Brands from './Pages/Brands'; 
import BrandDetails from './Pages/BrandDetails'; 
import AllProductsPage from './Pages/AllProductsPage'; 
import PrivacyPolicy from './Pages/PrivacyPolicy'; 
import TermsOfService from './Pages/TermsOfService'; 
import ProtectedRoute from './Components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }, 
      { path: 'contact', element: <Contact /> }, 
      { path: 'products', element: <AllProductsPage /> }, 
      { path: 'productdetails/:id', element: <ProductDetails /> },
      { path: 'categorydetails/:id', element: <CategoryDetails /> }, 
      { path: 'category/:id', element: <CategoryDetails /> }, 
      { path: 'privacy', element: <PrivacyPolicy /> }, 
      { path: 'terms', element: <TermsOfService /> }, 
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute> <Address /> </ProtectedRoute> }, 
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> }, 
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: "branddetails/:id", element: <ProtectedRoute> <BrandDetails /> </ProtectedRoute> }, 
      { path: '*', element: <Notfound /> } 
    ]
  }
]);

function App() {
  return (
    <TokenContextProvider>
      <CartContextProvider>
        <WishlistProvider> 
          <Toaster 
            position="top-center" 
            reverseOrder={false} 
            toastOptions={{
              duration: 3000,
              style: { secondary: '#28a745' },
            }} 
          />
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}

export default App;