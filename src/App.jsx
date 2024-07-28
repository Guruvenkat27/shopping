import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Loginpage from './components/register/Loginpage'
import Registerpage from './components/register/Registerpage'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/signup' element={<Registerpage />} />
      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
