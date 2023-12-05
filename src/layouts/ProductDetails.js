import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userId, setUserId] = useState(''); // Replace with the actual userId

  const bffBaseUrl = 'http://localhost:3001';
  const bffGetProductByIdEndpoint = (productId) => `${bffBaseUrl}/api/product/${productId}`;
  const backendOrderEndpoint = `${bffBaseUrl}/api/order`;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId || ''); // If storedUserId is null, set an empty string
    
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${bffGetProductByIdEndpoint(id)}`);
        const product = await response.json();
        setProductDetails(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleBuyNowClick = async () => {
    // Prepare order details in the required format
    const orderRequest = {
      userId: userId, // Add userId to the orderRequest
      orderLineItemsDtoList: [
        {
          skuCode: productDetails.name,
          price: productDetails.price,
          quantity: quantity,
        },
      ],
    };
  
    try {
      const response = await fetch(`${backendOrderEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest),
      });
  
      if (response.ok) {
        console.log('Order placed successfully');
        setOrderPlaced(true);
        // Optionally, you can redirect the user to a confirmation page
      } else {
        console.error('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{productDetails.name}</h2>
      <p>Description: {productDetails.description}</p>
      <p>Price: {productDetails.price}</p>

      {!orderPlaced && (
        <div>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Button onClick={handleBuyNowClick}>Buy Now</Button>
        </div>
      )}

      {orderPlaced && <p>Order placed successfully!</p>}
    </div>
  );
};

export default ProductDetails;
