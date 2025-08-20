import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient';
import ProductCart from '../components/productCart';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error.message);
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl my-5">List Product</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {products.map((product) => (
            <ProductCart key={product.id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
