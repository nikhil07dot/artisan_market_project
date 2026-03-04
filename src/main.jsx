import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Products from './components/Products/Products.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Cart from './components/Cart/Cart.jsx'
import CartProvider  from './components/Cart/CartContext.jsx'
import WishlistPage from './components/Wishlist/WishlistPage.jsx'
import WishlistProvider from './components/Wishlist/WishlistContext.jsx'
import Profile from './components/Profile/Profile.jsx'
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminProtectedRoute from './admin/AdminProtectedRoute.jsx'
import ProductManager from './admin/ProductManager.jsx'
import AdminProductList from './admin/AdminProductList.jsx'
import ProductDetail from './components/Products/ProductDetail.jsx';
import ToastProvider from './components/Toast/ToastContext.jsx';


const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path= '' element={<Home />} />
      <Route path= 'about' element={
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
        } />
      <Route path= 'contact' element={
      < ProtectedRoute>
      <Contact />
      </ProtectedRoute>
        } />
      <Route path= 'products' element={
        <ProtectedRoute>
          <Products/>
        </ProtectedRoute>
           } />
            <Route path='products/:id' element={
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      } />
      <Route path= 'cart' element={
        <ProtectedRoute>
          <Cart/>
        </ProtectedRoute>
           } />
      <Route path= 'login' element={<Login/>} />
      <Route path= 'wishlist' element={
        <ProtectedRoute>
          <WishlistPage/>
        </ProtectedRoute>
           } />
      <Route path= 'profile' element={<Profile/>} />
      <Route path= 'signup' element={<SignUp/>} />

       <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  } />

       <Route path="/admin/products" element={
  <AdminProtectedRoute>
    <ProductManager />
  </AdminProtectedRoute>
} />

       <Route path="/admin/productlist" element={
  <AdminProtectedRoute>
    <AdminProductList />
  </AdminProtectedRoute>
} />

      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<AuthProvider>
  <CartProvider>
    <WishlistProvider>
      <ToastProvider>
        <RouterProvider router={router}/>
      </ToastProvider>
    </WishlistProvider>
  </CartProvider>
</AuthProvider>
  </React.StrictMode>,
)
