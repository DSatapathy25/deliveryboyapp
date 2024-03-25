import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ rating, setRating }) => {
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const selected = index + 1 <= rating;
        return (
          <span key={index} onClick={() => handleStarClick(index + 1)} style={{ cursor: 'pointer' }}>
            <FaStar color={selected ? '#ffc107' : '#e4e5e9'} size={24} />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
