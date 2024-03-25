
import React, { useState } from 'react';
import email_icon from '../Assets/email.jpeg';
import password_icon from '../Assets/password2.jpeg';
import user_icon from '../Assets/user.jpeg';
import './LoginSignup.css';
import { useNavigate} from 'react-router-dom';


const LoginSignup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 const navigate = useNavigate()


 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
     
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Use name, email, and password directly
      });
      const responseData = await response.json(); // Rename data to responseData

      console.log(responseData, "sign-up responseData");
      // If signup was successful, redirect the user to the login page
      if (!response.ok) {
        // If response status is 400 (Bad Request), display the error message from the server
        if (response.status === 400) {
          const errorData = await response.json();
          alert(errorData.message);
        }
        // If response status is 500 (Internal Server Error), inform the user about the server error
        else if (response.status === 500) {
          alert('Internal server error. Please try again later.');
        }
        // For other status codes, display a generic error message
        else {
          alert('An error occurred. Please try again later.');
        }
      }
      // If response is okay, proceed with the success scenario
      else {
        alert('Signup successful! Please login.');
        navigate('/');
      }
    
      
     } catch (error) {
      console.error('Error:', error);
    
    }

    //
     
 


 
};


  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        {/* <div className='underline'></div> */}
      </div>
      <form className='inputs' onSubmit={handleSubmit}>
       
          <div className='input'>
            <img style={{ width: '30px', height: '30px', borderRadius: '30%' }} src={user_icon} alt='' />
            <input
              type='text'
              id='text'
              placeholder="User's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        
        <div className='input'>
          <img style={{ width: '30px', height: '30px', borderRadius: '30%' }} src={email_icon} alt='' />
          <input
            type='email'
            id='email'
            placeholder="Email I'D"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input'>
          <img style={{ width: '30px', height: '30px', borderRadius: '30%' }} src={password_icon} alt='' />
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       
        <div className='submit-container'>
          <button className='submit' type='submit'>Sign Up
         
          </button>
        
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
