import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../store/cart';
import { supabase } from '../createClient';

function CartItem({ data }) {
  const { productId, quantity } = data;
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetail = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) console.error('Error fetching product:', error.message);
      else setDetail(data);
    };

    fetchProductDetail();
  }, [productId]);

  if (!detail) return null;

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  const handlePlusQuantity = () => {
    dispatch(changeQuantity({ productId, quantity: quantity + 1 }));
  };

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img
        src={detail.image || 'https://via.placeholder.com/100x100?text=No+Image'}
        alt={detail.name}
        width="100"
      />
      <div>
        <h4>{detail.name}</h4>
        <p>{detail.price * quantity}</p>
        <div className='flex w-20 justify-between items-center gap-2'>
          <button className='bg-gray-200 rounded-full w-6 h-6 text-center' onClick={handleMinusQuantity}>-</button>
          <span>{quantity}</span>
          <button className='bg-gray-200 rounded-full w-6 h-6 text-center' onClick={handlePlusQuantity}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
