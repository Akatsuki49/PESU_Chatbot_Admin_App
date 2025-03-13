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
    <dialog ref={dialogRef} open={isModalOpen} onCancel={closeModal}>
      <QA_ReviewList wrapperRef={wrapperRef} />
    </dialog>
  );
};

export default ReviewModal;
