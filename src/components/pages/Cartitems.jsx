import React, { useContext } from 'react';
import Image from './Image';
import { Cartcontext } from '../../cart/Cartcontext';
import useAuth from '../../database/Auth';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const user = useAuth();
  const { cartItems, removeFromCart, cartCount, clearCart } = useContext(Cartcontext);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.product_price.replace('$', '')), 0);
  };

  return (
    <>
      <div className='flex justify-center gap-[35px]'>
        <div className='w-[80vw] mt-4 cartbox'>
          <h1 className='text-[30px] px-4'>Shopping Cart</h1>
          {cartItems.length > 0 ? (
            <div className='p-[10px]'>
              {cartItems.map((item) => (
                <div key={item.id} className='flex items-center border-b border-t border-gray-300 py-2'>
                  <Image src={item.product_photo} alt={item.product_title} className="h-[18vh] w-[9vw]" />
                  <div className='ml-4 flex flex-col'>
                    <p className='font-semibold'>{item.product_title}</p>
                    <span className='text-gray-600'>{item.product_price}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className='ml-auto text-red-500'>Remove</button>
                </div>
              ))}
              <div className='mt-4 flex justify-end'>
                <p>Subtotal:</p>
                <span className='font-bold'>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <button onClick={clearCart} className='mt-4 bg-red-500 text-white py-2 px-4 rounded'>
                Clear Cart
              </button>
            </div>
          ) : (
            <p className='px-[20px]'>Your cart is empty.</p>
          )}
        </div>
        <div className='mt-10 flex flex-col gap-4'>
          <span>Subtotal ({cartCount} items) : <b>${calculateSubtotal().toFixed(2)}</b></span>
          {user ? (
            <button className='rounded-md h-[5vh] text-white bg-red-500'><Link to={'/checkout'}>CheckOut</Link></button>
          ) : (
            <button className='rounded-md h-[5vh] text-white bg-red-500'>
              <Link to={"/login"}>Login to proceed</Link>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItems;
