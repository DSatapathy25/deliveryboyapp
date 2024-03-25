import React, { useState } from 'react';
import email_icon from '../Assets/email.jpeg';
import password_icon from '../Assets/password2.jpeg';

import './LoginSignin.css';
import { useNavigate} from 'react-router-dom';


const LoginSignin = () => {

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 const navigate = useNavigate()


 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
     

        const response = await fetch('/auth/login', { // Corrected endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
        });
       
        // If login was successful, redirect the user to the dashboard or home page
        if (response.ok) {
          const data = await response.json();
          const {token} = data;
           // Store the token in localStorage
    localStorage.setItem('token', token);
          console.log(data, "login-data");
          alert('Login successful!');
          navigate('/');
          // Redirect or perform other actions after login
        } else {
          const data = await response.json();
          alert(data.message); // Display error message
          console.log("error");
        }
      
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }

 }

    return (
        <div className='container'>
          <div className='header'>
            <div className='text'>Login</div>
            {/* <div className='underline'></div> */}
          </div>
          <form className='inputs' onSubmit={handleSubmit}>
            
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
              <button className='submit' type='submit'>Login
                </button>
             
            </div>
          </form>
        </div>
      );
    };
    
    export default LoginSignin;
    

 


