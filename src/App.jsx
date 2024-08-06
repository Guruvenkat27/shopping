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
import { LocationProvider } from './components/Location/LocationContext'
import History from './components/pages/History'
import { SavedItemsProvider } from './components/savelater/Savelatercontext'
import SavelaterPage from './components/savelater/SavelaterPage'
import Checkout from './checkout/Checkout'



const App = () => {
  return (
    <div>
    
  
   <CartProvider>
  <LocationProvider>
  <SavedItemsProvider>
  <SearchProvider>
    <Routes>
       
       <Route path='/' element={<Home />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/signup' element={<Registerpage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<Productdetails />} />
        <Route path='/cart' element={<Cartpage />} />
        <Route path='/history' element={<History />} />
        <Route path='/savelater' element={<SavelaterPage />} />
        <Route path='/checkout' element={<Checkout />} />
      
      </Routes>
    </SearchProvider>
  </SavedItemsProvider>
    
    </LocationProvider> 
   </CartProvider>
      
    
    
      
    </div>
  )
}

export default App
