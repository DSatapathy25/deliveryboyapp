// aboutus.jsx

import React from 'react';
import './AboutUs.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Our Food Delivery Service</h1>
        <p>
          We are your trusted food delivery partner, committed to bringing delicious meals right to your doorstep. Our team of dedicated delivery agents ensures timely and safe delivery of your favorite dishes.
        </p>
        <p>
          Why choose us?
        </p>
        <ul>
          <li>Fast and reliable service</li>
          <li>Wide variety of cuisines</li>
          <li>Easy ordering process</li>
          <li>Secure payment options</li>
          <li>Track your order in real-time</li>
        </ul>
        <p>
          Whether it's a quick lunch or a family dinner, we've got you covered. Place your order today and experience the convenience of our food delivery service!
        </p>
      </div>
      <div className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com"><FaFacebook /></a>
          <a href="https://www.twitter.com"><FaTwitter /></a>
          <a href="https://www.instagram.com"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
