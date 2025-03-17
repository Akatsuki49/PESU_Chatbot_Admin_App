import React, { useEffect, useRef } from 'react';
import Card from './Card';

const SimilarQAModal = ({ isModalOpen, closeModal, similarQA }) => {
  const dialogRef = useRef(null);
  console.log('similarQA', similarQA);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <dialog
      ref={dialogRef}
      open={isModalOpen}
      onCancel={closeModal}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#f2f2f2',
        height: '80%',
        // hide scrollbar
        scrollbarWidth: 'none',
        overflow: 'auto',
      }}
    >
      <div className="header">
        <div></div>
        <h2>Similar Q&A</h2>
        <button onClick={closeModal}>X</button>
      </div>
      {similarQA.map((qa) => (
        <Card
          key={qa.id}
          card={qa}
          isEditable={false}
          similarBtnVisibility={false}
        />
      ))}
      <div className="footerBtns">
        <button className="Approve">&#x2705;</button>
        <button className="Reject">&#x274c;</button>
      </div>
    </dialog>
  );
};

export default SimilarQAModal;
