import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate} from 'react-router-dom';
// import Cookies from 'js-cookie';
import user_icon from '../Assets/user.jpeg';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const  navigate=useNavigate();

 



  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
  console.log(token, "UI token");
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the authorization token
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getUserData();
  }, []);
  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/profile/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        // Logout was successful
        // Remove token from local storage
        localStorage.removeItem('token');
        console.log("You are now logged out");
        navigate('/');
      } else {
        // Logout failed
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      // Error occurred during logout request
      console.error('Logout failed:', error);
    }
  };
  
  

  return (
    <div className="profile-container">
      <div className="profile-info">
      <img src={user_icon} alt="" style={{ width: "80px", height: "80px", borderRadius: '50%' }} />
        <div className="user-details">
          <h2>Hello, {userData.name}</h2>
          <p>Account I'd : {userData.email}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
