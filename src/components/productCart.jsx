import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cart';
const ProductCart = (props) => {
    const carts = useSelector(store=>store.cart.items);

  const { id, name, price, image, slug } = props.data;
  const dispatch  = useDispatch();
  const handleAddToCart =() =>{
        dispatch(addToCart({
            productId: id,
            quantity: 1
        }))
  }


  return (
   <div className='bg-white p-5 rounded-xl shadow-sm'>
      <Link to={`/products/${id}`}>
        <img src={image} alt={name} className="w-full h-80 object-cover object-top" />
      </Link>

        <h3 className='text-2xl py-3 text-center font-medum'>{name}</h3>
        <div className='flex justify-between items-center'>
            <p>
                $<span className='text-2xl font-medium'>{price}</span>
            </p>
            <button className='bg-gray-300 flex items-center justify-center p-2 rounded-md text-sm hover:bg-gray-400' onClick={handleAddToCart}>
                <ShoppingCart className='me-2' size={16}/>
                Add To Cart</button>
        </div>
   </div>
  );
};

export default ProductCart;
