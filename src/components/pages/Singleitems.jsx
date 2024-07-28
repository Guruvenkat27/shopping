import React, {  useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Image from './Image';
import { FaStar } from "react-icons/fa6";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cartcontext } from '../../cart/Cartcontext';

const Singleitems = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(Cartcontext);

  useEffect(() => {
    const fetchProduct = async () => {
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/product-offers',
        params: {
          asin: `${productId}`,
          country: 'US',
          limit: '100',
          page: '1'
        },
        headers: {
          'x-rapidapi-key': '739ce0b840msh494d1fdebf6c234p1c67a6jsn9ab49d0394d4',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setProduct(response.data);
        console.log(response.data);
        localStorage.setItem("itemdetails", JSON.stringify(response.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  const { data } = product;

  // Ensure data and product properties are available
  if (!data || !data.product_photos || !data.product_photo || !data.product_title || !data.product_star_rating || !data.product_price || !data.product_variations || !data.product_variations.color) {
    return <div>Product data is not available</div>;
  }

  const handleAddToCart = () => {
    addToCart(data);
    toast.success('Item added to cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className='flex mt-6 justify-center gap-4'>
        <div className='flex flex-col gap-2 items-center overflow-y-scroll h-[70vh]'>
          {
            data.product_photos.map((item, index) => (
              <div className='border rounded-md w-[6vw]' key={index}>
                <Image src={item} className="h-[10vh] w-[100%]" />
              </div>
            ))
          }
        </div>
        <div className='border p-[5px]'>
          <Image src={data.product_photo} />
        </div>
        <div className='ml-3 flex flex-col'>
          <p className='font-bold text-[24px] w-[40vw]'>{data.product_title}</p>
          <div className='flex items-center'>
            <p className='flex bg-green-600 w-[3vw] rounded-md justify-center text-[13px] items-center gap-1 text-white'>
              {data.product_star_rating}
              <FaStar />
            </p>
            <span className="ml-2 text-xl">{data.product_star_rating}</span>
          </div>
          <div>
            <p>Price: <span>{data.product_price}</span></p>
          </div>
          <div className='flex mt-3 gap-2'>
            <button className='flex bg-[darkblue] w-[25vw] h-[6vh] text-[20px] text-white items-center justify-center' onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button className='flex items-center justify-center bg-orange-400 w-[10vw] text-white'>
              SAVE LATER
            </button>
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <h1 className='font-bold'>Colors</h1>
            <div className='colorsbox'>
              {
                data.product_variations.color.map((item, index) => (
                  <div className='border rounded-md cursor-pointer' key={index}>
                    <Image src={item.photo} className="w-[4vw] h-[7vh]" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singleitems;
