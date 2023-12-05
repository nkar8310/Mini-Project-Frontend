import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'cover', // Adjust background image size
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px 0px #000000',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: 'darkblue',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };
  const handleLogin = async () => {
    try {
      // Call the login API endpoint
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: '1b06qpv2nub623dc9flkoa4fvl',
          username,
          password,
        }),
      });

      const data = await response.json();

      // Check if login was successful
      if (response.ok) {
        // Log user details to the console
        console.log('Username:', username);
        console.log('Password:', password);
        // history.push('/mini-project/product');
        // window.location.href = '/mini-project/home';

        localStorage.setItem('userDetails', JSON.stringify({ username }));
        localStorage.setItem('userId', JSON.stringify({ username }));


        // Navigate based on user's role
        if (username === 'nomashikarunadasa@gmail.com') {
          window.location.href = '/mini-project/admin-home';
        } else {
          window.location.href = '/mini-project/home';
        }
      } else {
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1>Hi User</h1><br />
        <h2>Login To The Application</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button style={buttonStyle} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
