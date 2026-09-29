import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import User from './Pages/User'
import Order from './Pages/Order'
import Wishlist from './Pages/Wishlist'

import CustomCursor from './Components/CustomCursor'
import SpecialOffer from './Components/SpecialOffer'
import ScrollProgress from './Components/ScrollProgress'
import FomoToast from './Components/FomoToast'
import FloatingMenu from './Components/FloatingMenu'
import About from './Pages/About'
import Contact from './Pages/Contact'
import FAQ from './Pages/FAQ'
import ProductDetail from './Pages/ProductDetail'
import Lookbook from './Pages/Lookbook'
import Checkout from './Pages/Checkout'

const App = () => {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <SpecialOffer />
      <FomoToast />
      <Router>
        <FloatingMenu />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/users' element={<User/>}/>
          <Route path='/orders' element={<Order/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/lookbook' element={<Lookbook/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App