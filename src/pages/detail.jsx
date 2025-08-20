import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart';
import { supabase } from '../createClient';

function Detail() {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Error fetching product:', error?.message);
        navigate('/'); // redirect if product not found
      } else {
        setDetail(data);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!detail) return <p>Loading...</p>; // show while loading

  const handleMinusQuantity = () => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  const handlePlusQuantity = () => setQuantity(quantity + 1);

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: detail.id,
      quantity,
    }));
    console.log('Added to cart:', detail.id, quantity);
  };

  return (
    <div>
      <h2 className='text-3xl text-center mb-3'>Product Detail</h2>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='flex-1'>
          <img
            src={detail.image || 'https://via.placeholder.com/500x500?text=No+Image'}
            alt={detail.name}
            className='w-full object-cover'
          />
        </div>
        <div className='flex-1 flex flex-col gap-5'>
          <h1 className='text-4xl uppercase font-bold'>{detail.name}</h1>
          <p className='font-bold text-3xl'>${detail.price}</p>

          <div className='flex gap-5'>
            <div className='flex gap-2 justify-center items-center'>
              <button
                className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl'
                onClick={handleMinusQuantity}
              >
                -
              </button>
              <span className='bg-gray-200 h-full w-10 font-bold text-xl flex items-center justify-center rounded-xl'>
                {quantity}
              </span>
              <button
                className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl'
                onClick={handlePlusQuantity}
              >
                +
              </button>
              <button
                className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl'
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>

          <p>{detail.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
