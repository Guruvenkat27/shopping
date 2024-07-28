import React from 'react'
import Navbar from './components/pages/Navbar'
import { SearchProvider } from './search/Searchcontext'

const Home = () => {
  return (
    <div>
   <SearchProvider>
   <Navbar />
   </SearchProvider>
    </div>
  )
}

export default Home
