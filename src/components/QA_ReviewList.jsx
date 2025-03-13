import React from 'react';
import QA_ReviewCards from '../MockData/QA_ReviewCards.json';
import ReviewQACard from './ReviewQACard';

const QA_ReviewList = ({ wrapperRef }) => {
  return (
    <div className="QAList" ref={wrapperRef}>
      <h2>QA List</h2>
      {QA_ReviewCards.data.map((card) => (
        <ReviewQACard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default QA_ReviewList;
