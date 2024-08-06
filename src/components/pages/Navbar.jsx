// Navbar.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { Cartcontext } from '../../cart/Cartcontext';
import { SearchContext } from '../../search/Searchcontext';
import { LocationContext } from '../Location/LocationContext';
import Image from './Image';
import { useSavedItems } from '../savelater/Savelatercontext';
import useAuth from '../../database/Auth';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { cartCount } = useContext(Cartcontext);
  const { searchQuery, setSearchQuery, performSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const { city, pinCode } = useContext(LocationContext);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const { getSavedItemsCount } = useSavedItems();

  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <>
      <div>
        <div className='flex items-center justify-between px-[30px] py-[10px] navbarbox'>
          <div className='font-bold text-[26px] overflow-hidden h-[7vh] flex items-center justify-center'>
            <Link to={"/"}><Image src="/public/logo-white1.png" className="h-[30vh]" /></Link>
          </div>
          <div></div>
          <div>
            <form onSubmit={handleSearch} className='flex items-center search-box rounded-md overflow-hidden'>
              <input
                type="search"
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type='submit' className='bg-orange-400 h-[100%] flex items-center justify-center w-[8%]'>
                <FiSearch className='text-[20px]' />
              </button>
            </form>
          </div>
          <div className='flex items-center gap-2'>
            <MdLocationOn className='text-[18px]' />
            <div>
              {
                user ? (
                  <div className='text-[14px]'>
                    <span>Deliver to</span>
                    <div className='font-semibold'>{city}, {pinCode}</div>
                  </div>
                ) : (
                  <div>
                    Deliver to
                    <div>India</div>
                  </div>
                )
              }
            </div>
          </div>
          <div className='flex items-center gap-9'>
            <div>
              {user ? (
                <div className='relative flex items-center gap-4'>
                  <span
                    className='text-white items-center cursor-pointer'
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <p className='text-[11px]'>Hello, {user.displayName || 'User'}</p>
                    <Link className='text-[15px] font-semibold flex items-center gap-1'>
                      Account & Lists <IoIosArrowDown className='mt-1' />
                    </Link>
                  </span>
                  {dropdownVisible && (
                    <div className='absolute top-[50px] z-20 bg-white text-black right-[-40px] border border-gray-300 grid profbox rounded-md shadow-md'>
                      <div className='grid insideboxgridd gap-3'>
                        <span><Link>Account</Link></span>
                        <span><Link>Orders</Link></span>
                        <span><Link to={"/history"}>Browsing History</Link></span>
                        <span><Link to={"/savelater"}>Watchlist {getSavedItemsCount()}</Link></span>
                        <span><Link>Memberships & Subscription</Link></span>
                        <span><Link>Subscribe & Save items</Link></span>
                        <span><Link>Settings</Link></span>
                        <span><Link>Switch Accounts</Link></span>
                        <span onClick={handleSignOut}>Sign Out</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <span className='cursor-pointer relative' onClick={toggleBoxVisibility}>
                  <p className='text-[12px]'>Hello, sign in</p>
                  <Link className='text-[14px] flex items-center gap-1'>
                    Account & Lists <IoIosArrowDown className='mt-1' />
                  </Link>
                  {isBoxVisible && (
                    <div className='absolute top-[50px] left-[-70px] z-20'>
                      <div className='inside-box bg-white text-black w-[16vw] flex flex-col items-center py-4'>
                        <div className='grid gap-1'>
                          <Link className='bg-orange-500 w-[10vw] flex items-center justify-center text-white rounded-md h-[4vh]' to={"/login"}>Sign In</Link>
                          <span className='text-center text-[11px]'>New customer <Link className='text-blue-600 underline' to={"/signup"}>Start here</Link></span>
                        </div>
                        <div className='grid insideboxgrid  gap-3 mt-6'>
                          <span><Link>Account</Link></span>
                          <span><Link>Orders</Link></span>
                          <span><Link to={"/history"}>Browsing History</Link></span>
                          <span><Link>Watchlist</Link></span>
                          <span><Link>Memberships & Subscription</Link></span>
                          <span><Link>Subscribe & Save items</Link></span>
                          <span><Link>Settings</Link></span>
                        </div>
                      </div>
                    </div>
                  )}
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
        <div className='nav-box2 flex items-center gap-8 pl-7 py-3'>
          <div className='flex items-center gap-1'>
            <FaBars className='text-[20px]' /> All
          </div>
          <button>Today's Deals</button>
          <button>Buy Again</button>
          <button>Customer Service</button>
          <button>Gift Cards</button>
          <button className='flex items-center'>More <IoMdArrowDropdown className='pt-1 text-[21px]' /></button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
