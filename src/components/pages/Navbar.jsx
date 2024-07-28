import React, { useState, useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import useAuth from '../../database/Auth';
import { IoIosArrowDown } from "react-icons/io";
import { auth } from '../../database/Database';
import { SearchContext } from '../../search/Searchcontext';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
  const user = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Consume the search context
  const { searchQuery, setSearchQuery, performSearch } = useContext(SearchContext);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <>
      <div>
      <div className='flex items-center justify-between px-[50px] py-[15px] navbarbox'>
        <div className='font-bold text-[26px]'><Link to={"/"}>LOGO</Link></div>
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
            <>
              <div className='relative flex items-center gap-4'>
                <span className='text-white flex items-center cursor-pointer' onClick={() => setDropdownVisible(!dropdownVisible)}>
                  Welcome, {user.displayName || 'User'}  <IoIosArrowDown />
                </span>
                {dropdownVisible && (
                  <div className='absolute top-[30px] right-0 border border-gray-300 grid profbox rounded-md shadow-md'>
                    <button className='w-[15vw] h-[4.6vh]'>Profile</button>
                    <button onClick={() => auth.signOut()} className='w-[15vw] h-[4.6vh]'>Sign Out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <span className='bg-green-600 cursor-pointer w-[7vw] flex items-center justify-center h-[4vh] rounded-md shadow-md text-white'>
              <Link to={"/login"}>Signup/Login</Link>
            </span>
          )}
        </div>
        <div className=''><Link to={"/cart"} className='flex items-center gap-1'><FaShoppingCart className='text-[19px]' /> cart</Link></div>
       </div>
      
        
      </div>
      <div className='nav-box2  flex items-center gap-8 pl-12 py-3'>
        <button>Phones</button><button>furniture</button><button>electronics</button><button>dresses</button><button className='flex  items-center '>More <IoMdArrowDropdown className='pt-1 text-[21px]' /></button><button></button><button></button><button></button>

        
      </div>
      </div>
    </>
  );
}

export default Navbar;
