import React, { useState, useContext } from 'react';
import { SearchContext } from '../../search/Searchcontext';

const FilterBox = () => {
  const { setSearchQuery, performSearch } = useContext(SearchContext);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState('all');

  const handleFilter = () => {
    const filters = {
      category,
      priceRange,
      brand,
      rating,
      availability
    };
    performSearch(filters); // Pass filters to the search function
  };

  return (
    <div className='filter-box flex gap-5 mt-4 border-t pt-3 flex-col'>
     
      <div className='filter-item flex flex-col gap-2'>
        <label className='font-bold'>Category</label>
        <select
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>All Categories</option>
          <option value='electronics'>Electronics</option>
          <option value='furniture'>Furniture</option>
          <option value='clothing'>Clothing</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className='filter-item flex flex-col gap-2'>
        <label className='font-bold'>Price Range</label>
        <input
          type='range'
          id='priceRange'
          min='0'
          max='1000'
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
        />
        <span>${priceRange[0]} - ${priceRange[1]}</span>
      </div>
      <div className='filter-item flex flex-col gap-2'>
        <label htmlFor='brand' className='font-bold'>Brand</label>
        <input
          type='text'
          id='brand'
          placeholder='search'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className='outline-none px-3 h-[4.5vh] border'
          
        />
      </div>
      <div className='filter-item flex flex-col gap-2'>
        <label htmlFor='rating' className='font-bold'>Rating</label>
        <select
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value='0'>All Ratings</option>
          <option value='1'>1 Star & Up</option>
          <option value='2'>2 Stars & Up</option>
          <option value='3'>3 Stars & Up</option>
          <option value='4'>4 Stars & Up</option>
          <option value='5'>5 Stars</option>
        </select>
      </div>
      <div className='filter-item flex flex-col gap-2'>
        <label htmlFor='availability' className='font-bold'>Availability</label>
        <select
          id='availability'
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value='all'>All</option>
          <option value='in-stock'>In Stock</option>
          <option value='out-of-stock'>Out of Stock</option>
        </select>
      </div>
      <button onClick={handleFilter} className='bg-blue-600 text-white p-2 rounded'>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBox;
