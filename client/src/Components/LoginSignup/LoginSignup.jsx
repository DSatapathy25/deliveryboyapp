
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
        body: JSON.stringify({ name, email, password }), 
      });
      const responseData = await response.json(); 

      console.log(responseData, "sign-up responseData");
     
      if (!response.ok) {
       
        if (response.status === 400) {
          const errorData = await response.json();
          alert(errorData.message);
        }
        
        else if (response.status === 500) {
          alert('Internal server error. Please try again later.');
        }
      
        else {
          alert('An error occurred. Please try again later.');
        }
      }
    
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
