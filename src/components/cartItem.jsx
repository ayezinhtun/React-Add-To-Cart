import React, { useEffect, useState } from 'react';
import { products } from '../pages/Product';
import { useDispatch } from 'react-redux';
import {changeQuantity}  from '../store/cart';

function CartItem(props) {
  const { productId, quantity } = props.data;
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const findDetail = products.find((product) => product.id === productId);
    setDetail(findDetail);
  }, [productId]);

  if (!detail) return null; // prevent render until detail is loaded

  const handleMinusQuantity = () => {
  dispatch(changeQuantity({
    productId,
    quantity: quantity - 1  // decrease current quantity
  }));
};

const handlePlusQuantity = () => {
  dispatch(changeQuantity({
    productId,
    quantity: quantity + 1  // increase current quantity
  }));
};

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img src={detail.image} alt={detail.name} width="100" />
      <div>
        <h4>{detail.name}</h4>
        <p>{detail.price * quantity}</p>
        <div className='w-20 justify-between gap-2'>
            <button className='bg-gray-200 rounded-full w-6 h-6 text-center me-2' onClick={handleMinusQuantity}>-</button>
            <span className='me-2'>{quantity}</span>
            <button className='bg-gray-200 rounded-full w-6 h-6 text-center' onClick={handlePlusQuantity}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
