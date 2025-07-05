import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // The API returns products in a 'products' array within the response object
        // Also, map API fields to the ones used in the application (e.g., title to name)
        const formattedProducts = data.products.map(product => ({
          id: product.id,
          name: product.title, // API uses 'title', app uses 'name'
          price: product.price,
          stock: product.stock,
        }));
        setProducts(formattedProducts);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return { products, loading, error };
};

export default useProducts;
