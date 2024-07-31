import React, { useState, useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../database/Auth';
import { IoIosArrowDown } from "react-icons/io";
import { auth } from '../../database/Database';
import { SearchContext } from '../../search/Searchcontext';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Cartcontext } from '../../cart/Cartcontext';
import Image from './Image';

const Navbar = () => {
  const user = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { cartCount } = useContext(Cartcontext);
  const { searchQuery, setSearchQuery, performSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <>
      <div>
        <div className='flex items-center justify-between px-[50px] py-[10px] navbarbox'>
          <div className='font-bold text-[26px] overflow-hidden h-[7vh] flex items-center justify-center'>
            <Link to={"/"} className=''><Image src="/public/logo-white1.png " className=" h-[30vh] " /></Link>
          </div>
          <div>
            <form onSubmit={handleSearch} className='flex items-center search-box rounded-md overflow-hidden'>
              <input
                type="search"
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=''
              />
              <button type='submit' className='bg-orange-400 h-[100%] flex items-center justify-center w-[9%]'>
                <FiSearch className='text-[20px]' />
              </button>
            </form>
          </div>
          <div className='flex items-center gap-9'>
            <div>
              {user ? (
                <div className='relative flex items-center gap-4'>
                  <span
                    className='text-white flex items-center cursor-pointer'
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  >
                    Welcome, {user.displayName || 'User'} <IoIosArrowDown />
                  </span>
                  {dropdownVisible && (
                    <div className='absolute top-[30px] right-0 border border-gray-300 grid profbox rounded-md shadow-md'>
                      <button className='w-[15vw] h-[4.6vh]'>Profile</button>
                      <button onClick={handleSignOut} className='w-[15vw] h-[4.6vh]'>Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <span className='cursor-pointer'>
                  <p className='text-[12px]'>Hello, sign in</p>
                  <Link to={"/login"} className='text-[14px] flex items-center gap-1'>
                    Account & Lists <IoIosArrowDown className='mt-1'/>
                  </Link>
                </span>
              )}
            </div>
            <div className='relative'>
              <Link to={"/cart"} className='flex items-center gap-1'>
                <FaShoppingCart className='text-[19px]' /> Cart
              </Link>
              <div className='absolute top-[-10px] left-[10px] bg-red-600 rounded px-[5px] text-sm py-0'>
                {cartCount}
              </div>
            </div>
          </div>
        </div>
        <div className='nav-box2 flex items-center gap-8 pl-12 py-3'>
          <button>Phones</button>
          <button>Furniture</button>
          <button>Electronics</button>
          <button>Dresses</button>
          <button className='flex items-center'>More <IoMdArrowDropdown className='pt-1 text-[21px]' /></button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
