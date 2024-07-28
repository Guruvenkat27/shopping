import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Loginpage from './components/register/Loginpage'
import Registerpage from './components/register/Registerpage'
import Products from './components/products/Products'
import { SearchProvider } from './search/Searchcontext'
import Productdetails from './components/products/Productdetails'
import { CartProvider } from './cart/Cartcontext'
import Cartpage from './cart/Cartpage'



const App = () => {
  return (
    <div>
    
  
   <CartProvider>
   <SearchProvider>
    <Routes>
       
       <Route path='/' element={<Home />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/signup' element={<Registerpage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<Productdetails />} />
        <Route path='/cart' element={<Cartpage />} />
      
      </Routes>
    </SearchProvider>
   </CartProvider>
      
    
    
      
    </div>
  )
}

export default App
