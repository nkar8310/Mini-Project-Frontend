// import React, { useState, useEffect } from 'react';
// import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import Navbar from '../components/NavBar';
// import backgroundImage from '../assets/bg.jpg';
// import { useHistory } from 'react-router-dom';

// const containerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '100vh',
//   backgroundImage: `url(${backgroundImage})`,
//   backgroundSize: 'cover',
// };

// const tableStyle = {
//   width: '100%',
//   margin: '20px 0',
// };

// const buttonStyle = {
//   borderRadius: '50px',
//   backgroundColor: 'lightblue',
//   padding: '8px 16px',
// };

// function Order() {
//   const [orderData, setOrderData] = useState([]);
//   const [editedOrder, setEditedOrder] = useState({});
//   const [showEditModal, setShowEditModal] = useState(false);
//   const history = useHistory();

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/order/user/${userId}`);
//         const orders = response.data;
//         setOrderData(orders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEditClick = (order) => {
//     setEditedOrder(order);
//     setShowEditModal(true);
//   };
//   const bffGetOrderDetailsEndpoint = (orderId) => `${bffBaseUrl}/api/order/${orderId}`;

// // Assuming this function is defined in your component
// const updateOrder = async (orderId, orderRequest) => {
//   try {
//     const response = await axios.put(`http://localhost:3001/api/order/${orderId}`, orderRequest);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// const handleSaveEdit = async () => {
//   try {
//     // Assuming you have the updateOrder function
//     await updateOrder(editedOrder.id, editedOrder);

//     // Close the modal after saving
//     setShowEditModal(false);

//     // Refresh the order data after saving
//     const userId = localStorage.getItem('userId');
    
//     // Ensure you have the correct orderId to fetch the updated data
//     const orderId = editedOrder.id;

//     const response = await axios.get(`http://localhost:3001/api/order/${orderId}`);
//     const orders = response.data;
//     setOrderData(orders);
//   } catch (error) {
//     console.error('Error saving order:', error);
//   }
// };



//   return (
//     <div>
//       <Navbar />
//       <div style={containerStyle}>
//         <Container>
//           <h1>ALL ORDERS</h1>
//           <Table striped bordered hover style={tableStyle}>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderData.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.userId}</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={editedOrder.skuCode || order.orderLineItemsList[0].skuCode}
//                       onChange={(e) =>
//                         setEditedOrder({ ...editedOrder, skuCode: e.target.value })
//                       }
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={editedOrder.price || order.orderLineItemsList[0].price}
//                       onChange={(e) =>
//                         setEditedOrder({ ...editedOrder, price: e.target.value })
//                       }
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={editedOrder.quantity || order.orderLineItemsList[0].quantity}
//                       onChange={(e) =>
//                         setEditedOrder({ ...editedOrder, quantity: e.target.value })
//                       }
//                     />
//                   </td>

//                   <td>
//                     <Button style={buttonStyle} onClick={handleSaveEdit}>
//                       Save Changes
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Container>
//       </div>

//       {/* Edit Order Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Order</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             {/* Input fields for the order details you want to edit */}
//             <Form.Group controlId="formSkuCode">
//               <Form.Label>Sku Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Sku Code"
//                 value={editedOrder.skuCode || ''}
//                 onChange={(e) => setEditedOrder({ ...editedOrder, skuCode: e.target.value })}
//               />
//             </Form.Group>
//             {/* Repeat this for other fields like price, quantity, etc. */}

//             <Button variant="primary" onClick={handleSaveEdit}>
//               Save Changes
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Order;
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/NavBar';
import backgroundImage from '../assets/bg.jpg';

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

const buttonStyle = {
  borderRadius: '50px',
  backgroundColor: 'lightblue',
  padding: '8px 16px',
};

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const userId = localStorage.getItem('userId');
  console.log(userId.username);
  console.log(userId); // Check the value of userId to see what is stored in localStorage
  const parsedUserId = JSON.parse(userId);
  console.log(parsedUserId.username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/order/user/${parsedUserId.username}`);
        const orders = response.data;
        setOrderDetails(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Container>
          <h1>ORDER DETAILS</h1>
          <Table striped bordered hover style={tableStyle}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{parsedUserId.username}</td>
                  <td>{order.orderLineItemsList[0].skuCode}</td>
                  <td>{order.orderLineItemsList[0].price}</td>
                  <td>{order.orderLineItemsList[0].quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button style={buttonStyle}>Back to products</Button>
        </Container>
      </div>
    </div>
  );
}

export default OrderDetails;
