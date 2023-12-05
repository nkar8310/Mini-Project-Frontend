import React from 'react';
import Navbar from '../components/AdminNavBar';
import backgroundImage from '../assets/adminhome.jpg'; // Replace with the actual path to your home.jpg

const AdminHome = () => {
  return (
    <div>
      <Navbar />

      <div
        style={{
          backgroundImage: `url(${backgroundImage})`, // Replace with your image file
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ADD8E6', // Light Blue color
        }}
      > <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'white',
        textShadow: '5px 5px 5px rgba(0, 0, 0, 0.8)', // Optional text shadow for better visibility
      }}
    >
      <h1 style={{ fontSize: '5rem', marginBottom: '10px' }}>Welcome, Admin!</h1>
      <p style={{ fontSize: '1.5rem' }}>Fresh vegetables as you are</p>
    </div>
       
      </div>
    </div>
  );
};

export default AdminHome;
