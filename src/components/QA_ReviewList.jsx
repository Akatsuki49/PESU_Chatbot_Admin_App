import React from 'react';
// import QA_ReviewCards from '../MockData/QA_ReviewCards.json';
import Card from './Card';
import './styles/QA_ReviewList.css';
import { useContext } from 'react';
import { QAContext } from '../context/QAContextProvider';

const QA_ReviewList = ({ wrapperRef, closeModal }) => {
  const { qaList } = useContext(QAContext);
  return (
    <div className="QAList" ref={wrapperRef}>
      <div className="header">
        <div></div>
        <h2>QA List</h2>
        <button onClick={closeModal}>X</button>
      </div>
      {Array.from(qaList).map((card) => {
        return <Card key={card.id} card={card} isEditable={false} />;
      })}
      <button className="addQA">Upload QAs</button>
    </div>
  );
};

export default QA_ReviewList;
