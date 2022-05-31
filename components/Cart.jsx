import React, {useRef} from 'react'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping,AiOutlineLeft} from 'react-icons/ai'

import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client'

const Cart = () => {
  const cartRef= useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart}=useStateContext();
 
  return (
    <section className="cart-wrapper" ref={cartRef}>
      <div className='cart-container'>
        <button type ="button" className="cart-heading"
        onClick={()=>setShowCart(false)}
        >
          <AiOutlineLeft/>
          <span className='heading'> Your Cart</span>
         
          <span className='cart-num-items'> ({totalQuantities} items)</span>

        </button>
        

        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150}/>
              <h3> No items Added</h3>
              <Link href='/'>
                <button type="button" onClick={()=>setShowCart(false)} className="btn">
                  Continue shopping
                </button>
              </Link>
            </div>
          )
        }
         <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    // onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cart;