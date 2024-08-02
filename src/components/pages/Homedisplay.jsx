import React, { useEffect, useRef } from 'react'
import Image from './Image'
import Footer from './Footer';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Homedisplay = () => {
    const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.querySelector('.image-container').offsetWidth;
      scrollRef.current.scrollBy({
        left: -containerWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.querySelector('.image-container').offsetWidth;
      scrollRef.current.scrollBy({
        left: containerWidth,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className='relative'>
      <div className='relative mainbox pl-2 pr-2'>
      <button className='arrow left-arrow' onClick={scrollLeft}><IoIosArrowBack /></button>
        <div className='imagescroll' ref={scrollRef}>
        <div className='image-container'>
          <Image src="/public/images/81KkrQWEHIL._SX3000_.jpg" alt="Image 1" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/61CiqVTRBEL._SX3000_.jpg" alt="Image 2" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/61lwJy4B8PL._SX3000_.jpg" alt="Image 3" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/61zAjw4bqPL._SX3000_.jpg" alt="Image 4" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/71Ie3JXGfVL._SX3000_.jpg" alt="Image 5" />
        </div>
    

{/* duplicate images */}
<div className='image-container'>
          <Image src="/public/images/81KkrQWEHIL._SX3000_.jpg" alt="Image 1" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/61CiqVTRBEL._SX3000_.jpg" alt="Image 2" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/61lwJy4B8PL._SX3000_.jpg" alt="Image 3" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/61zAjw4bqPL._SX3000_.jpg" alt="Image 4" />
        </div>
        <div className='image-container'>
          <Image src="/public/images/71Ie3JXGfVL._SX3000_.jpg" alt="Image 5" />
        </div>


        </div>
        <button className='arrow right-arrow' onClick={scrollRight}><IoIosArrowForward /></button>

    
      </div>
      <div className='  absolute  top-[45%] w-[100%] left-0'>
       <div className='homegrid'>
        <div className='homegridbox py-[18px]'>
            <h1 className='pl-[20px] font-bold text-[18px]' >Pick up where you left off</h1>
            <div className='smallbox mt-4 '>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/1.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A15 (s...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/2.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung GAlaxy A15 5...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/3.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Sanmung Galaxy A15 (S...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/4.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A05 (S...</p>
                </div>
                <span className='text-[13px] text-sky-500 font-semibold cursor-pointer'>See more</span>
            </div>
        </div>
        <div className='homegridbox flex flex-col gap-2 py-[18px] px-5'>
            <h1 className='font-bold text-[18px] '>Deaals in PCs</h1>
            <Image src="/public/images/5.jpg" className="h-[40vh]"/>
            <span className='text-[13px] text-sky-500 font-semibold cursor-pointer  mt-6 '>See more</span>
        </div>
        <div className='homegridbox py-[18px]'>  
        <h1 className='pl-[20px] font-bold text-[18px]' >Pick up where you left off</h1>
            <div className='smallbox mt-4 '>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/6.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A15 (s...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/7.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung GAlaxy A15 5...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/8.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Sanmung Galaxy A15 (S...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/9.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A05 (S...</p>
                </div>
                <span className='text-[13px] text-sky-500 font-semibold cursor-pointer'>See more</span>
            </div></div>
            <div className='homegridbox flex flex-col gap-2 py-[18px] px-5'>
            <h1 className='font-bold text-[18px] '>Deaals in PCs</h1>
            <Image src="/public/images/10.jpg" className="h-[40vh]"/>
            <span className='text-[13px] text-sky-500 font-semibold cursor-pointer  mt-6'>See more</span>
        </div>
        <div className='homegridbox py-[18px]'>
            <h1 className='pl-[20px] font-bold text-[18px]' >Pick up where you left off</h1>
            <div className='smallbox mt-4 '>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/11.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A15 (s...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/12.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung GAlaxy A15 5...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/13.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Sanmung Galaxy A15 (S...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/14.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A05 (S...</p>
                </div>
                <span className='text-[13px] text-sky-500 font-semibold cursor-pointer'>See more</span>
            </div>
        </div>
        <div className='homegridbox flex flex-col gap-2 py-[18px] px-5'>
            <h1 className='font-bold text-[18px] '>Deaals in PCs</h1>
            <Image src="/public/images/15.jpg" className="h-[40vh]"/>
            <span className='text-[13px] text-sky-500 font-semibold cursor-pointer  mt-6'>See more</span>
        </div>
        <div className='homegridbox py-[18px]'>
            <h1 className='pl-[20px] font-bold text-[18px]' >Pick up where you left off</h1>
            <div className='smallbox mt-4 '>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/16.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A15 (s...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/17.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung GAlaxy A15 5...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/18.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Sanmung Galaxy A15 (S...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/19.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A05 (S...</p>
                </div>
                <span className='text-[13px] text-sky-500 font-semibold cursor-pointer'>See more</span>
            </div>
        </div>
        <div className='homegridbox flex flex-col gap-2 py-[18px] px-5'>
            <h1 className='font-bold text-[18px] '>Deaals in PCs</h1>
            <Image src="/public/images/20.jpg" className="h-[40vh]"/>
            <span className='text-[13px] text-sky-500 font-semibold cursor-pointer  mt-6'>See more</span>
        </div>
        </div>
        <div className='homegrid'>
     
        <div className='homegridbox flex flex-col gap-2 py-[18px] px-5'>
            <h1 className='font-bold text-[18px] '>Deaals in PCs</h1>
            <Image src="/public/images/5.jpg" className="h-[40vh]"/>
            <span className='text-[13px] text-sky-500 font-semibold cursor-pointer  mt-6 '>See more</span>
        </div>
        <div className='homegridbox flex flex-col gap-2 py-[18px] px-5'>
            <h1 className='font-bold text-[18px] '>Deaals in PCs</h1>
            <Image src="/public/images/10.jpg" className="h-[40vh]"/>
            <span className='text-[13px] text-sky-500 font-semibold cursor-pointer  mt-6'>See more</span>
        </div>
        <div className='homegridbox py-[18px]'>
            <h1 className='pl-[20px] font-bold text-[18px]' >Pick up where you left off</h1>
            <div className='smallbox mt-4 '>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/1.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A15 (s...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/2.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung GAlaxy A15 5...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/3.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Sanmung Galaxy A15 (S...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/4.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A05 (S...</p>
                </div>
                <span className='text-[13px] text-sky-500 font-semibold cursor-pointer'>See more</span>
            </div>
        </div>
        <div className='homegridbox py-[18px]'>  
        <h1 className='pl-[20px] font-bold text-[18px]' >Pick up where you left off</h1>
            <div className='smallbox mt-4 '>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/6.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A15 (s...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/7.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung GAlaxy A15 5...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/8.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Sanmung Galaxy A15 (S...</p>
                </div>
                <div className='flex flex-col items-center gap-1'><Image src="/public/images/9.jpg"/>
                <p className='text-[13px] w-[10vw] text-center'>Samsung Galaxy A05 (S...</p>
                </div>
                <span className='text-[13px] text-sky-500 font-semibold cursor-pointer'>See more</span>
            </div></div>
          
       
      
        </div>
        <Footer />
      </div>

    </div>
  )
}

export default Homedisplay
