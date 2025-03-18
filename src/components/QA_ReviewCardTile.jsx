import React from 'react';
import Card from './Card';
import './styles/QA_ReviewCardTile.css';

const QA_ReviewCardTile = ({ card, addToList, removeFromList }) => {
  const handleChange = (event) => {
    if (event.target.checked) {
      addToList(card);
    } else {
      // Only if you also want to remove it when unchecked
      removeFromList(card);
    }
  };
  return (
    <div className="QA_ReviewCardTile">
      <label id={card.id} hidden></label>
      <Card key={card.id} card={card} isEditable={false} />
      <input
        type="checkbox"
        id={card.id}
        name={card.id}
        onChange={handleChange}
      />
    </div>
  );
};

export default QA_ReviewCardTile;
