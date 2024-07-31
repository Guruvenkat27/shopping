import React from 'react'
import { SearchProvider } from '../../search/Searchcontext'
import Navbar from '../pages/Navbar'
import Productitems from '../pages/Productitems'
import Footer from '../pages/Footer'

const Products = () => {
  return (
    <div>
      <SearchProvider>

        <Navbar />
        <Productitems />
        <Footer />

      </SearchProvider>
    </div>
  )
}

export default Products
