import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import useAuth from '../../database/Auth';
import { IoIosArrowDown } from "react-icons/io";
import { auth } from '../../database/Database'; 
const Navbar = () => {

    const user= useAuth()
    const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
    <div className=' flex items-center justify-between px-[50px] py-[10px] navbarbox'>
        <div className='font-bold text-[26px]'>LOGO</div>
        <div className='flex items-center search-box'><input type="search" placeholder='Search' name="" id="" /><FiSearch />
        </div>
      <div>
      {
      user?(<>
       <div className='relative flex items-center gap-4'>
          <span className='text-white flex items-center cursor-pointer' onClick={() => setDropdownVisible(!dropdownVisible)}>Welcome, {user.displayName || 'User'}  <IoIosArrowDown /></span>
          {dropdownVisible && (
            <div className='absolute top-[30px] right-0  border border-gray-300 grid profbox rounded-md shadow-md'>
              <button className='w-[15vw] h-[4.6vh]   '>Profile</button>
            <button onClick={() => auth.signOut()} className='w-[15vw] h-[4.6vh] '>Sign Out</button>
            </div>
          )}
        </div>
      
     
      </>):(
        <>
         <span  className='bg-green-600 cursor-pointer w-[7vw] flex items-center justify-center h-[4vh] rounded-md shadow-md text-white'>
       <Link to={"/login"}>   Signup/Login</Link>
        </span>
        
        </>
      )
     }
      </div>
      </div>
    
    </>
  )
}

export default Navbar
