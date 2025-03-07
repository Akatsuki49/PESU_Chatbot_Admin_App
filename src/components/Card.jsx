import React, { useState } from 'react';
import './styles/Card.css';

const Card = ({ card, deleteCard, updateCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card">
        <div className="header">
          <button onClick={() => deleteCard(card.id)}>Delete</button>
          <button
            onClick={() => {
              const newCard = {
                ...card,
                question: 'Updated Question',
                answer: 'Updated Answer',
              };
              updateCard(card.id, newCard);
            }}
          >
            Update
          </button>
        </div>
        <h2>{card.question}</h2>
        <p>{card.answer}</p>
      </div>
    </>
  );
};

export default Card;

// will be adding udpate modal
