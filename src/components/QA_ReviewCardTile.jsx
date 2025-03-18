import React from 'react';
import Card from './Card';
import './styles/QA_ReviewCardTile.css';

const QA_ReviewCardTile = ({ card, addToList }) => {
  return (
    <div className="QA_ReviewCardTile">
      <label id={card.id} hidden></label>
      <Card key={card.id} card={card} isEditable={false} />
      <input
        type="checkbox"
        id={card.id}
        name={card.id}
        onChange={() => addToList(card)}
      />
    </div>
  );
};

export default QA_ReviewCardTile;
