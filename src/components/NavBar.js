import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete user details from storage
    localStorage.removeItem('userDetails');
    sessionStorage.removeItem('userDetails');

    // Navigate to the login page
    navigate('/mini-project/login');
  };

  return (
    
    <nav style={{ background: '#0000A0', padding: '10px 0' }} className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        {/* FoodieVistaVeggies logo or name */}
        <Link style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', marginRight: '20px' }} className="navbar-brand" to="/">
          FoodieVistaVeggies
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav me-auto" style={{ display: 'flex', alignItems: 'center' }}>
          <li className="nav-item">
            <Link style={{ color: '#FFFFFF', margin: '0 20px' }} className="nav-link11" to="/mini-project/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ color: '#FFFFFF', margin: '0 20px' }} className="nav-link22" to="/mini-project/product">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ color: '#FFFFFF', margin: '0 20px' }} className="nav-link33" to="/mini-project/order">
              Your Orders
            </Link>
          </li>
        </ul>

        {/* Right-aligned items */}
        <div className="d-flex justify-content-end align-items-center">
          {/* Profile icon (you can replace this with your actual profile icon) */}
          <span className="navbar-text">
            <i className="bi bi-person-circle" style={{ fontSize: '2rem', color: '#FFFFFF', marginRight: '500px' }}></i>
          </span>

          {/* Logout button (you can replace this with your actual logout logic) */}
          <button
            style={{ fontSize: '1rem', color: '#000000', backgroundColor: '#FFFFFF', border: 'none', padding: '8px 15px', borderRadius: '5px' }}
            className="btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
