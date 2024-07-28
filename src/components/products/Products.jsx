import React from 'react'
import { SearchProvider } from '../../search/Searchcontext'
import Navbar from '../pages/Navbar'
import Productitems from '../pages/Productitems'

const Products = () => {
  return (
    <div>
      <SearchProvider>

        <Navbar />
        <Productitems />

      </SearchProvider>
    </div>
  )
}

export default Products
