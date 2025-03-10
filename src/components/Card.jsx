import React, { useRef, useState } from 'react';
import './styles/Card.css';
import ConfirmationModal from './ConfirmationModal';
import { useForm } from 'react-hook-form';

const Card = ({ card, deleteCard, updateCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      question: card.question,
      answer: card.answer,
    },
  });

  const callBackRef = useRef(null);

  const handleDelete = () => {
    setIsConfirmModalOpen(true);
    callBackRef.current = () => deleteCard(card.id);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // If we're exiting edit mode without submitting, reset the form
      reset({
        question: card.question,
        answer: card.answer,
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (data) => {
    const newCard = { ...card, ...data };
    setIsConfirmModalOpen(true);
    callBackRef.current = () => {
      updateCard(card.id, newCard);
      setIsEditing(false);
    };
  };

  return (
    <>
      <div className="card">
        <div className="header">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
        </div>

        {!isEditing ? (
          <div className="content">
            <h3>Question: {card.question}</h3>
            <p>Answer: {card.answer}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="question">Question:</label>
            <textarea
              placeholder="Question"
              name="question"
              id="question"
              {...register('question')}
            />
            <label htmlFor="answer">Answer:</label>
            <textarea
              placeholder="Answer"
              name="answer"
              id="answer"
              {...register('answer')}
            />
            <button type="submit">Update Card</button>
          </form>
        )}
      </div>

      <ConfirmationModal
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={() => setIsConfirmModalOpen(false)}
        callBack={callBackRef.current}
        reset={reset}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

export default Card;
