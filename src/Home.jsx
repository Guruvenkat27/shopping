import React from 'react'
import Navbar from './components/pages/Navbar'
import { SearchProvider } from './search/Searchcontext'
import Footer from './components/pages/Footer'

const Home = () => {
  return (
    <div>
   <SearchProvider>
   <Navbar />
   <Footer />
   </SearchProvider>
    </div>
  )
}

export default Home
