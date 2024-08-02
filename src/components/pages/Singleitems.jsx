import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Image from './Image';
import { FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cartcontext } from '../../cart/Cartcontext';

const Singleitems = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const { addToCart } = useContext(Cartcontext);

  const fetchProduct = async (asin) => {
    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/product-offers',
      params: {
        asin: `${asin}`,
        country: 'US',
        limit: '100',
        page: '1'
      },
      headers: {
        'x-rapidapi-key': 'bf338cc407msh2627a187536db81p177a69jsn9c13d14d6d1d',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setProduct(response.data);
      setSelectedImage(response.data.data.product_photo); 
      console.log(response.data);
      localStorage.setItem("itemdetails", JSON.stringify(response.data));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  if (loading) return <div className='relative'><div className='load'>Loading...</div></div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  const { data } = product;

  // Ensure data and product properties are available
  const productPhotos = data.product_photos || [];
  const productPhoto = data.product_photo || '';
  const productTitle = data.product_title || 'No title available';
  const productRating = data.product_star_rating || 'No rating';
  const productPrice = data.product_price || 'No price';
  const colorVariations = (data.product_variations && data.product_variations.color) || [];

  const handleAddToCart = () => {
    const isAuthenticated = Boolean(localStorage.getItem("user")); 
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    } else {
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
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorVariationClick = (asin) => {
    setLoading(true);
    fetchProduct(asin);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex mt-6 justify-center gap-4 mb-9'>
        <div className='flex flex-col gap-2 items-center overflow-y-scroll h-[70vh]'>
          {productPhotos.map((item) => (
            <div className='border rounded-md w-[6vw] p-[7px]' key={item.asin} onClick={() => handleImageClick(item)}>
              <Image src={item} className="h-[10vh] w-[100%] cursor-pointer" />
            </div>
          ))}
        </div>
        <div className='border p-[5px]'>
          <Image src={selectedImage} />
        </div>
        <div className='ml-3 flex flex-col'>
          <p className='font-bold text-[24px] w-[40vw]'>{productTitle}</p>
          <div className='flex items-center'>
            <p className='flex bg-green-600 w-[3vw] rounded-md justify-center text-[13px] items-center gap-1 text-white'>
              {productRating}
              <FaStar />
            </p>
            <span className="ml-2 text-xl">{productRating}</span>
          </div>
          <div>
            <p>Price: <span>{productPrice}</span></p>
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
              {colorVariations.map((item) => (
                <div className='border rounded-md cursor-pointer' onClick={() => handleColorVariationClick(item.asin)} key={item.asin}>
                  <Image src={item.photo} className="w-[4vw] h-[7vh]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singleitems;
