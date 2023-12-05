import React from 'react';
import Navbar from '../components/NavBar';
import backgroundImage from '../assets/home.jpg'; // Replace with the actual path to your home.jpg

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Blurred Background Image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          filter: 'blur(0px)', // Adjust the blur intensity as needed
        }}
      >
        {/* Content in the front of the image */}
        <div
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
          <h1 style={{ fontSize: '5rem', marginBottom: '10px' }}>FoodieVistaVeggies</h1>
          <p style={{ fontSize: '1.5rem' }}>Fresh vegetables as you are</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
