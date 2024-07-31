import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    
       <div className='footerbox'>
       <div className='font-bold text-[26px] overflow-hidden h-[7vh] flex items-center justify-center'>
            <Link to={"/"} className=''><Image src="/public/logo-white1.png " className=" h-[30vh] " /></Link>
          </div>
       </div>
    </>
  )
}

export default Footer
