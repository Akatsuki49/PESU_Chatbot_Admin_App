import React, { useEffect, useRef } from 'react';
import QA_ReviewList from './QA_ReviewList';

const ReviewModal = ({ isModalOpen, closeModal }) => {
  const dialogRef = useRef(null);
  const wrapperRef = useRef(null);

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
      <QA_ReviewList wrapperRef={wrapperRef} closeModal={closeModal} />
    </dialog>
  );
};

export default ReviewModal;
