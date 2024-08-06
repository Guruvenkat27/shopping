import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Image from './Image';
import { FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cartcontext } from '../../cart/Cartcontext';
import { useSavedItems } from '../savelater/Savelatercontext'; // Import the context
import Loadingpage from '../loading/Loadingpage';

const Singleitems = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const { addToCart } = useContext(Cartcontext);
  const { saveItem } = useSavedItems(); // Use the context

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
        'x-rapidapi-key': '6b59714c77msh186a59e4af781fap10b35ajsnac7699056342',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setProduct(response.data);
      setSelectedImage(response.data.data.product_photo); 
      console.log(response.data);

      // Store viewed items in local storage
      const viewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];
      const alreadyViewed = viewedItems.find(viewedItem => viewedItem.data.asin === response.data.data.asin);

      if (!alreadyViewed) {
        viewedItems.unshift(response.data);
        if (viewedItems.length > 10) {
          viewedItems.pop();
        }
        localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  if (loading) return <div className='h-[75vh] '><Loadingpage /></div>;
  if (error) return (
    <div className="flex items-center justify-center min-h-[75vh] bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-4">
          <span className="font-bold text-xl text-red-600">This page isn't working</span>
          <span className="font-semibold text-lg text-gray-700">If the problem continues, contact the site owner.</span>
          <span className="text-gray-500 text-[17px] mt-4">Error{error.message}</span>
        </div>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="flex items-center justify-center min-h-[75vh] bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No Product Found</h2>
        <p className="text-gray-500">Please check back later or explore other categories.</p>
      </div>
    </div>
  );
  

  const { data } = product;

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

  const handleSaveLater = () => {
    saveItem(product);
    toast.success('Item saved for later!', {
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
            <button className='flex items-center justify-center bg-orange-400 w-[10vw] text-white' onClick={handleSaveLater}>
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
