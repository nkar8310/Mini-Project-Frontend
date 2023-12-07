import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import 'bulma/css/bulma.min.css';
import axios from 'axios';
import Navbar from '../components/AdminNavBar';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import backgroundImage from '../assets/bg.jpg';
import * as routes from '../constants/routes';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
};

const tableStyle = {
  width: '100%',
  margin: '20px 0',
};

const confirmedStyle = {
  backgroundColor: 'lightgreen',
};

const buttonStyle = {
  borderRadius: '50px',
  padding: '8px 16px',
};

const bffBaseUrl = 'http://localhost:3001';
const bffGetAllOrdersEndpoint = `${bffBaseUrl}/api/order`;

function AdminOrder() {
  const [orderData, setOrderData] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const fetchData = async () => {
    try {
      const response = await axios.get(bffGetAllOrdersEndpoint);
      const orders = response.data; // Modify this based on your API response structure
      setOrderData(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = (orderId) => {
    setConfirmedOrders((prevConfirmedOrders) => [...prevConfirmedOrders, orderId]);
  };

  const isOrderConfirmed = (orderId) => confirmedOrders.includes(orderId);

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Container>
          <h1>ALL ORDERS</h1>
          <Table striped bordered hover style={tableStyle}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order.id} style={isOrderConfirmed(order.id) ? confirmedStyle : {}}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>
                    {isOrderConfirmed(order.id) ? (
                      <Button disabled style={buttonStyle}>Confirmed</Button>
                    ) : (
                      <Button style={buttonStyle} onClick={() => handleConfirm(order.id)}>
                        Confirm
                      </Button>
                    )}
                    <Link to={`/mini-project/admin-order/${order.id}`}>
                      <Button style={buttonStyle}>View More</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default AdminOrder;
