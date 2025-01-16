import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/apiService';

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array of products, but got:', data);
          setProducts([]); 
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]); 
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="page">
      <br />
      <h1>Welcome to our Store</h1>
      <p className=''>Discover our amazing products</p>
      <ul>
        {Array.isArray(filteredProducts) && filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;