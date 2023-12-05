import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Navbar from '../components/AdminNavBar';
import { useParams } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assuming your backend API endpoint for fetching order details is "/api/order/:id"
  const bffBaseUrl = 'http://localhost:3001';
  const bffGetOrderDetailsEndpoint = (orderId) => `${bffBaseUrl}/api/order/${orderId}`;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(bffGetOrderDetailsEndpoint(id));
        const order = await response.json();
        setOrderDetails(order);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching order details</p>;
  }

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Container>
          <h1>Order Details</h1>
          <p>Order ID: {orderDetails.id}</p>
          <p>Order Number: {orderDetails.orderNumber}</p>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderLineItemsList &&
                orderDetails.orderLineItemsList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.skuCode}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default OrderDetails;
