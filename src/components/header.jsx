import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import {toggleStatusTab} from '../store/cart'

function header() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector(store => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
  let total = 0;
  carts.forEach(item => total += item.quantity);
  setTotalQuantity(total);
}, [carts]); 

const handleOpenTabCart = () =>{
  dispatch(toggleStatusTab());
}

  return (
    <header className='flex justify-between items-center'>
      <Link to="/" className='text-xl font-semibold'>Home.</Link>
      <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative' onClick={handleOpenTabCart}>
        <ShoppingCart size={16}/>
<span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>
  {totalQuantity}
</span>
      </div>
    </header>
  )
}

export default header
