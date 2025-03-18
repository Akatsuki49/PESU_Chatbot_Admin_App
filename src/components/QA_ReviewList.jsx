import React, { useState } from 'react';
import './styles/QA_ReviewList.css';
import { useContext } from 'react';
import { QAContext } from '../context/QAContextProvider';
import QA_ReviewCardTile from './QA_ReviewCardTile';

const QA_ReviewList = ({ wrapperRef, closeModal }) => {
  const { qaList, approveQA } = useContext(QAContext);
  const [qasToUpload, setQasToUpload] = useState([]);

  const addToList = (qa) => setQasToUpload([...qasToUpload, qa]);
  const removeFromList = (qa) =>
    setQasToUpload(qasToUpload.filter((q) => q.id !== qa.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    qasToUpload.forEach((qa) => approveQA(qa.id));
  };

  const finalqaList = qaList.filter((qa) => qa.status === 0);

  return (
    <div className="QAList" ref={wrapperRef}>
      <div className="header">
        <div></div>
        <h2>QA List</h2>
        <button onClick={closeModal}>X</button>
      </div>
      <form onSubmit={handleSubmit}>
        {Array.from(finalqaList).map((card) => {
          return (
            <QA_ReviewCardTile
              key={card.id}
              card={card}
              addToList={addToList}
              removeFromList={removeFromList}
            />
          );
        })}
        <button className="addQA" type="submit">
          Upload QAs
        </button>
      </form>
    </div>
  );
};

export default QA_ReviewList;
