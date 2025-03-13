import React from 'react';

const ReviewQACard = ({ card }) => {
  return (
    <div className="ReviewQACard">
      <h3>{card.question}</h3>
      <p>{card.answer}</p>
    </div>
  );
};

export default ReviewQACard;
