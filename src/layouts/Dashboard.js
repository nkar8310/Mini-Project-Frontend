import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';
function Dashboard() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    // backgroundColor: 'lightblue',
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
  const handleSignUp = async () => {
    try {
      // Call the registration API endpoint
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: '1b06qpv2nub623dc9flkoa4fvl',
          username,
          password,
          email,
          name,
        }),
      });

      const data = await response.json();

      // Check if registration was successful
      if (response.ok) {
        setRegistrationSuccess(true);
      } else {
        alert(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      // Call the confirmation API endpoint
      const response = await fetch('http://localhost:3001/api/users/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: '1b06qpv2nub623dc9flkoa4fvl',
          username,
          code: confirmationCode,
        }),
      });

      const data = await response.json();

      // Check if confirmation was successful
      if (response.ok) {
        alert('Confirmation successful. You can now log in.');
        // Redirect to the login page
        // You can use React Router's history or navigate to the login page as needed
      } else {
        alert(`Confirmation failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during confirmation:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Register To The Application</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
        {!registrationSuccess ? (
          <button style={buttonStyle} onClick={handleSignUp}>Register</button>
        ) : (
          <>
            <p>Registration successful! Check your email for the confirmation code.</p>
            <input type="text" placeholder="Confirmation Code" onChange={(e) => setConfirmationCode(e.target.value)} /><br /><br />
            <button style={buttonStyle} onClick={handleConfirmSignUp}>Confirm</button>
          </>
        )}
        <p>Already registered? <Link to="/mini-project/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Dashboard;