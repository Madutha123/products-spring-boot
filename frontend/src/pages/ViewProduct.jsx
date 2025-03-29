import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Extract the ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      // Check if ID is valid before making the request
      if (!id) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }

      try {
        // Ensure the URL matches your backend endpoint exactly
        const response = await axios.get(`http://localhost:8086/api/products/get/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="product-details">
      <h1>Product Details</h1>
      <div>
        <strong>Name:</strong> {product.name}
      </div>
      <div>
        <strong>Price:</strong> ${product.price}
      </div>
      <div>
        <strong>Description:</strong> {product.description}
      </div>
      <button onClick={() => navigate('/edit/' + id)}>Edit Product</button>
      <button onClick={() => navigate(-1)}>Back to List</button>
    </div>
  );
};

export default ViewProduct;