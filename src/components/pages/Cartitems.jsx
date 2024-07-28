import React, { useContext } from 'react'
import { Cartcontext } from '../../cart/Cartcontext'

const Cartitems = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(Cartcontext);
    console.log('Cart items',cartItems)
  return (
    <div>
      cart
    </div>
  )
}

export default Cartitems
