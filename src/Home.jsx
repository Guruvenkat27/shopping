import React from 'react'
import Navbar from './components/pages/Navbar'
import { SearchProvider } from './search/Searchcontext'
import Footer from './components/pages/Footer'
import Homedisplay from './components/pages/Homedisplay'

const Home = () => {
  return (
    <div>
   <SearchProvider>
   <Navbar />
   <Homedisplay />
  
   </SearchProvider>
    </div>
  )
}

export default Home
