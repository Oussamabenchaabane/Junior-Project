import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/apiService';

function Products({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

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
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  const handleAddProduct = async () => {
    try {
      const product = await createProduct(newProduct);
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        const product = await updateProduct(editingProduct.id, newProduct);
        setProducts(products.map(p => (p.id === editingProduct.id ? product : p)));
        setEditingProduct(null);
        setNewProduct({ name: '', price: '' });
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="page">
    <br></br>
    <br></br>
    <br></br>
      <h1  className='h1 hama'>Our Products</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => startEditing(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products; 