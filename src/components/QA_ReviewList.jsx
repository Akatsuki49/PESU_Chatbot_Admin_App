import React from 'react';
import QA_ReviewCards from '../MockData/QA_ReviewCards.json';
import Card from './Card';
import './styles/QA_ReviewList.css';

const QA_ReviewList = ({ wrapperRef, closeModal }) => {
  return (
    <div className="QAList" ref={wrapperRef}>
      <div className="header">
        <div></div>
        <h2>QA List</h2>
        <button onClick={closeModal}>X</button>
      </div>
      {QA_ReviewCards.data.map((card) => (
        <Card key={card.id} card={card} isEditable={false} />
      ))}
      <button className="addQA">Upload QAs</button>
    </div>
  );
};

export default QA_ReviewList;
