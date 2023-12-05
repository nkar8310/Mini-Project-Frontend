import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Navbar from '../components/NavBar';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const cardStyle = {
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: 'white',
  margin: '0 10px 20px 10px',
  width: 'calc(33.33% - 20px)',
  display: 'inline-block',
  overflow: 'hidden',
};

const cardImageStyle = {
  height: '150px', // Adjust the height as needed
  objectFit: 'cover',
};

const buttonStyle = {
  borderRadius: '50px',
  backgroundColor: 'lightblue',
  padding: '8px 16px',
};

const activeButtonStyle = {
  backgroundColor: 'darkblue',
  color: 'lightblue',
};

const bffBaseUrl = 'http://localhost:3001';
const bffGetAllProductsEndpoint = `${bffBaseUrl}/api/product`;
const backendOrderEndpoint = '${bffBaseUrl}/api/order'; // Replace with the actual endpoint

function Product() {
  const [vegetableData, setVegetableData] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    productId: null,
    quantity: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(bffGetAllProductsEndpoint);
        const products = await response.json();
        setVegetableData(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (vegetableId) => {
    setActiveButton(vegetableId);
    setOrderDetails({ ...orderDetails, productId: vegetableId });
  };

  const handleQuantityChange = (event) => {
    setOrderDetails({ ...orderDetails, quantity: parseInt(event.target.value, 10) });
  };

  const handleBuyButtonClick = async () => {
    if (!orderDetails.productId) {
      console.error('Product not selected');
      return;
    }

    const orderRequest = {
      orderLineItemsDtoList: [
        {
          skuCode: vegetableData.find((v) => v.id === orderDetails.productId).name,
          price: vegetableData.find((v) => v.id === orderDetails.productId).price,
          quantity: orderDetails.quantity,
        },
      ],
    };

    try {
      const response = await fetch(backendOrderEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest),
      });

      if (response.ok) {
        console.log('Order placed successfully');
        // Optionally, you can redirect the user to a confirmation page
      } else {
        console.error('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
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
              <Link to={`/mini-project/product/${vegetable.id}`}>
                <div className="card">
                  <div className="card-image">
                    <img
                      src={`https://source.unsplash.com/300x150/?${vegetable.name}`} // Fetching image from Unsplash
                      alt={vegetable.name}
                      style={cardImageStyle}
                    />
                  </div>
                  <div className="card-content">
                    <p className="title is-4">{vegetable.name}</p>
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
                  </footer>
                </div>
              </Link>
            </div>
          ))}

          {orderDetails.productId && (
            <div>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={orderDetails.quantity}
                  onChange={handleQuantityChange}
                />
              </Form.Group>
              <Button style={buttonStyle} onClick={handleBuyButtonClick}>
                Buy Now
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Product;
