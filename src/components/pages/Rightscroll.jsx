import React from 'react'
import Image from './Image'
import { useEffect, useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Rightscroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
      const interval = setInterval(() => {
        scrollRight();
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: -scrollRef.current.clientWidth,
          behavior: 'smooth'
        });
      }
    };
  
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: scrollRef.current.clientWidth,
          behavior: 'smooth'
        });
      }
    };
  return (
 
    <>
    <div className='px-[30px]'>
        <div className='relative mainboxx pl-2 pr-2'>
        <h1 className='px-[30px] font-bold text-[24px]'>Best Deals</h1>

      <button className='arroww left-arroww' onClick={scrollLeft}><IoIosArrowBack /></button>
      <div className='imagescrolll mt-5' ref={scrollRef}>
        <div className='flex flex-nowrap gap-6 px-3'>
          <Image src="/public/images/38.jpg" alt="Image 38" className="scrolldiv" />
          <Image src="/public/images/39.jpg" alt="Image 39" className="scrolldiv" />
          <Image src="/public/images/40.jpg" alt="Image 40" className="scrolldiv" />
          <Image src="/public/images/41.jpg" alt="Image 41" className="scrolldiv" />
          <Image src="/public/images/42.jpg" alt="Image 42" className="scrolldiv" />
          <Image src="/public/images/43.jpg" alt="Image 43" className="scrolldiv" />
          <Image src="/public/images/44.jpg" alt="Image 44" className="scrolldiv" />
          <Image src="/public/images/45.jpg" alt="Image 45" className="scrolldiv" />
          <Image src="/public/images/46.jpg" alt="Image 46" className="scrolldiv" />
          <Image src="/public/images/47.jpg" alt="Image 47" className="scrolldiv" />
          <Image src="/public/images/48.jpg" alt="Image 48" className="scrolldiv" />
          <Image src="/public/images/49.jpg" alt="Image 49" className="scrolldiv" />
        </div>
      </div>
      <button className='arroww right-arroww' onClick={scrollRight}><IoIosArrowForward /></button>
    </div>


    </div>
    
      
    </>
  )
}

export default Rightscroll
