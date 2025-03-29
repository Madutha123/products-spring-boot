import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ products, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      // Ensure you're using the correct URL and HTTP method
      await axios.delete(`http://localhost:8086/api/products/delete/${id}`);
      onDelete(id); // Call the parent component's delete handler
    } catch (error) {
      console.error('Delete Error:', error.response ? error.response.data : error.message);
      
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      
      // Optional: Show user-friendly error message
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <Link to={`/view/${product.id}`}>View</Link>
                <Link to={`/edit/${product.id}`}>Edit</Link>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;