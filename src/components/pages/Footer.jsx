import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footerbox bg-gray-900 text-white pt-8 flex flex-col'>
      <div className='flex justify-between px-[80px] mb-14'>
       
        <div className=''>
          <h3 className='font-bold text-lg mb-2'>Contact Us</h3>
          <p>123 Main Street, Anytown, USA</p>
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className=''>
          <h3 className='font-bold text-lg mb-2'>Quick Links</h3>
          <ul className='space-y-1'>
            <li><Link to="/" className='hover:underline'>Home</Link></li>
            <li><Link to="/about" className='hover:underline'>About Us</Link></li>
            <li><Link to="/services" className='hover:underline'>Services</Link></li>
            <li><Link to="/contact" className='hover:underline'>Contact Us</Link></li>
          </ul>
        </div>
        <div className=''>
          <h3 className='font-bold text-lg mb-2'>Let us help you</h3>
          <ul className='space-y-1'>
            <li><Link to="/" className='hover:underline'>Your Account</Link></li>
            <li><Link to="/about" className='hover:underline'> Your Orders</Link></li>
            <li><Link to="/services" className='hover:underline'>Shipping Rates & Policies</Link></li>
            <li><Link to="/contact" className='hover:underline'> Return & Replacements</Link></li>
            <li><Link to="/return&replacements" className='hover:underline'> Return & Replacements</Link></li>
            <li><Link to="/help" className='hover:underline'> Help</Link></li>


          </ul>
        </div>
        
        <div className='flex flex-col   items-center'>
        <div className='font-bold text-[26px] overflow-hidden h-[7vh] flex items-center  justify-center'>
            <Link to={"/"}><Image src="/public/logo-white1.png" className="h-[50vh]" /></Link>
          </div>
          <h3 className='font-bold text-lg mt-4 mb-2'>Follow Us</h3>
          <div className='flex space-x-4'>
            <Link to="#" className='text-white hover:text-gray-400'>
              <FaFacebook size={24} />
            </Link>
            <Link to="#" className='text-white hover:text-gray-400'>
              <FaTwitter size={24} />
            </Link>
            <Link to="#" className='text-white hover:text-gray-400'>
              <FaInstagram size={24} />
            </Link>
            <Link to="#" className='text-white hover:text-gray-400'>
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-gray-800 py-4  px-14'>
        <div className='container mx-auto flex justify-between items-center'>
          <p className='text-sm text-gray-400'>&copy; 2024 our Company. All rights reserved.</p>
          <ul className='flex space-x-4 text-sm text-gray-400'>
            <li><Link to="/privacy" className='hover:underline'>Privacy Policy</Link></li>
            <li><Link to="/terms" className='hover:underline'>Terms of Service</Link></li>
            <li><Link to="/faq" className='hover:underline'>FAQ</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
