import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    try {
      await axios.post('http://localhost:8086/api/products/create', product);
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;