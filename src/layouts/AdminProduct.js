import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import axios from 'axios';
import Navbar from '../components/AdminNavBar';
import backgroundImage from '../assets/bg.jpg';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
};

const cardStyle = {
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: 'white',
  margin: '0 10px 20px 10px',
  width: 'calc(33.33% - 20px)',
  display: 'inline-block',
};

const buttonStyle = {
  borderRadius: '50px',
  backgroundColor: 'lightblue',
  padding: '8px 16px',
};
const cardImageStyle = {
  height: '150px', // Adjust the height as needed
  objectFit: 'cover',
};

const activeButtonStyle = {
  backgroundColor: 'darkblue',
  color: 'lightblue',
};

const bffBaseUrl = 'http://localhost:3001';
const bffGetAllProductsEndpoint = `${bffBaseUrl}/api/product`;

const createProduct = async (productRequest) => {
  try {
    const response = await axios.post(`${bffBaseUrl}/api/product`, productRequest);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

function AdminProduct() {
  const [vegetableData, setVegetableData] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const editProduct = (vegetable) => {
    setEditingProduct(vegetable);
    setFormData({
      name: vegetable.name,
      description: vegetable.description,
      price: vegetable.price,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(bffGetAllProductsEndpoint);
      const products = await response.json();
      setVegetableData(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      console.log('Deleting product with ID:', productId);
      if (productId !== null) {
        await axios.delete(`${bffBaseUrl}/api/product/${productId}`);
        console.log('Product deleted successfully');
        fetchData();
      } else {
        console.error('Invalid product ID');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleButtonClick = async (vegetableId) => {
    if (vegetableId === 'new') {
      try {
        await createProduct(formData);
        fetchData();
      } catch (error) {
        console.error('Error creating product:', error);
      }
    } else if (vegetableId === 'delete') {
      try {
        setActiveButton(vegetableId);
        await deleteProduct(editingProduct.id); // Use editingProduct.id instead of activeButton
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    } else {
      window.location.href = `/mini-project/product/${vegetableId}`;
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      if (editingProduct) {
        await axios.put(`${bffBaseUrl}/api/product/${editingProduct.id}`, formData);
      } else {
        await createProduct(formData);
      }
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Container>
          <h1>MANY PRODUCTS YOU CAN BUY HERE</h1>

          {vegetableData.map((vegetable) => (
            <div key={vegetable.id} style={cardStyle}>
              <div className="card" style={{ backgroundColor: 'lightblue' }}>
                <div className="card-image">
                  <img
                    src={`https://source.unsplash.com/300x150/?${vegetable.name}`} // Fetching image from Unsplash
                    alt={vegetable.name}

                  />                </div>
                <div className="card-content">
                  <p className="title is-4" style={{ color: 'darkblue' }}>
                    {vegetable.name}
                  </p>
                </div>
                <footer className="card-footer">
                  <Link to={`/mini-project/product/${vegetable.id}`}>
                    <button
                      className="card-footer-item"
                      style={
                        activeButton === vegetable.id
                          ? { ...buttonStyle, ...activeButtonStyle }
                          : buttonStyle
                      }
                      onClick={() => handleButtonClick(vegetable.id)}
                    >
                      View More
                    </button>
                  </Link>
                  <button
                    className="card-footer-item"
                    style={buttonStyle}
                    onClick={() => deleteProduct(vegetable.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="card-footer-item"
                    style={buttonStyle}
                    onClick={() => editProduct(vegetable)}
                  >
                    Edit
                  </button>
                </footer>
              </div>
            </div>
          ))}

<div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>Create products here
  <Form>
    <table style={{ width: '50%' }}>
      <tbody>
        <tr>
          <td style={{ width: '50%' }}>
            <Form.Group controlId="formName">
              <Form.Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Product Name</Form.Label>
            </Form.Group>
          </td>
          <td style={{ width: '50%' }}>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Form.Group controlId="formDescription">
              <Form.Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Product Description</Form.Label>
            </Form.Group>
          </td>
          <td>
            <Form.Control
              as="textarea"
              placeholder="Enter product description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Form.Group controlId="formPrice">
              <Form.Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Product Price</Form.Label>
            </Form.Group>
          </td>
          <td>
            <Form.Control
              type="text"
              placeholder="Enter product price"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <Button variant="primary" onClick={submitForm} style={{ marginTop: '10px' }}>
      {editingProduct ? 'Update Product' : 'Create Product'}
    </Button>
  </Form>
</div>



        </Container>
      </div>
    </div>
  );
}

export default AdminProduct;