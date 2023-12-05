// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import 'bulma/css/bulma.min.css';
// import axios from 'axios';  // Import axios library
// import Navbar from '../components/NavBar';
// import backgroundImage from '../assets/bg.jpg';

// const containerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '100vh',
//   backgroundImage: `url(${backgroundImage})`,
//   backgroundSize: 'cover',
// };

// const cardStyle = {
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   borderRadius: '10px',
//   backgroundColor: 'white',
//   margin: '0 10px 20px 10px',
//   width: 'calc(33.33% - 20px)',
//   display: 'inline-block',
// };

// const buttonStyle = {
//   borderRadius: '50px',
//   backgroundColor: 'lightblue',
//   padding: '8px 16px',
// };

// const activeButtonStyle = {
//   backgroundColor: 'darkblue',
//   color: 'lightblue',
// };

// const bffBaseUrl = 'http://localhost:3001';
// const bffGetAllProductsEndpoint = `${bffBaseUrl}/api/product`;
// const bffGetProductById = (productRequest) => `${bffBaseUrl}/api/product/${productId}`;

// // Move the createProduct function declaration here
// const createProduct = async (productRequest) => {
//   try {
//     const response = await axios.post(`${bffBaseUrl}/api/product`, productRequest);
//     return response.data;
//   } catch (error) {
//     // Check if 'response' and 'response.data' are present in the error object
//     if (error.response && error.response.data) {
//       throw error.response.data;
//     } else {
//       // If 'response' or 'response.data' is missing, throw the entire error object
//       throw error;
//     }
//   }
// };



// function AdminProduct() {
//   const [vegetableData, setVegetableData] = useState([]);
//   const [activeButton, setActiveButton] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//   });
//   const [editingProduct, setEditingProduct] = useState(null);

//   const editProduct = (vegetable) => {
//     setEditingProduct(vegetable);
//     setFormData({
//       name: vegetable.name,
//       description: vegetable.description,
//       price: vegetable.price,
//     });
//   };
//   const fetchData = async () => {
//     try {
//       const response = await fetch(bffGetAllProductsEndpoint);
//       const products = await response.json();
//       setVegetableData(products);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const deleteProduct = async (productId) => {
//     try {
//       console.log('Deleting product with ID:', productId);
//       if (productId !== null) {
//         await axios.delete(`${bffBaseUrl}/api/product/${productId}`);
//         console.log('Product deleted successfully');
//         // Fetch updated product list after deletion
//         fetchData();
//       } else {
//         console.error('Invalid product ID');
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };
//   const handleButtonClick = async (vegetableId) => {


//     // Check if the button is for creating a new product
//     if (vegetableId === 'new') {
//       try {
//         // Call the BFF function to create a new product
//         await createProduct(formData);
//         // Fetch updated product list
//         fetchData();
//       } catch (error) {
//         console.error('Error creating product:', error);
//       }
//     } else if (vegetableId === 'delete') {
//       // Check if the button is for deleting a product
//       try {
//         setActiveButton(vegetableId);
//         // Call the BFF function to delete the product
//         await deleteProduct(activeButton); // Use activeButton instead of vegetableId
//       } catch (error) {
//         console.error('Error deleting product:', error);
//       }
//     } else {
//       // Redirect to the product details page only if the button is not "Delete"
//       window.location.href = `/mini-project/product/${vegetableId}`;
//     }
//   };



//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const submitForm = async () => {
//     try {
//       if (editingProduct) {
//         await axios.put(`${bffBaseUrl}/api/product/${editingProduct.id}`, formData);
//       } else {
//         await createProduct(formData);
//       }
//       setEditingProduct(null);
//       fetchData();
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div style={containerStyle}>
//         <Container>
//           <h1>MANY PRODUCTS YOU CAN BUY HERE</h1>

//           {vegetableData.map((vegetable) => (
//             <div key={vegetable.id} style={cardStyle}>

//               <div className="card" style={{ backgroundColor: 'lightblue' }}>
//                 <div className="card-image">
//                   <img src={vegetable.image} alt={vegetable.name} />
//                 </div>
//                 <div className="card-content">
//                   <p className="title is-4" style={{ color: 'darkblue' }}>
//                     {vegetable.name}
//                   </p>
//                 </div>
//                 <footer className="card-footer">
//                   <Link to={`/mini-project/product/${vegetable.id}`}>
//                     <button
//                       className="card-footer-item"
//                       style={
//                         activeButton === vegetable.id
//                           ? { ...buttonStyle, ...activeButtonStyle }
//                           : buttonStyle
//                       }
//                       onClick={() => handleButtonClick(vegetable.id)}
//                     >
//                       View More
//                     </button>
//                   </Link>
//                   <button
//                     className="card-footer-item"
//                     style={buttonStyle}
//                     onClick={() => deleteProduct(vegetable.id)} // Pass the actual product ID
//                   >
//                     Delete
//                   </button>

//                   <button
//                     className="card-footer-item"
//                     style={buttonStyle}
//                     onClick={() => editProduct(vegetable)}
//                   >
//                     Edit
//                   </button>
//                 </footer>
//               </div>
//             </div>
//           ))}

//           {/* Form for creating a new product */}
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Product Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter product name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formDescription">
//               <Form.Label>Product Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 placeholder="Enter product description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPrice">
//               <Form.Label>Product Price</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter product price"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>
//             <Button
//               variant="primary"
//               onClick={() => handleButtonClick('new')}
//             >
//               Create Product
//             </Button>
//           </Form>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default AdminProduct;
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

          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={submitForm}
            >
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default AdminProduct;
