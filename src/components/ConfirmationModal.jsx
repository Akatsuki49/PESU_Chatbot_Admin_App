import React from 'react';

import { useEffect, useRef } from 'react';
import './styles/ConfirmationModal.css';

const ConfirmationModal = ({
  isConfirmModalOpen,
  closeConfirmModal,
  callBack,
  reset,
  isEditing,
  setIsEditing = null,
}) => {
  const confRef = useRef();

  useEffect(() => {
    if (isConfirmModalOpen) {
      confRef.current.showModal();
    } else {
      confRef.current.close();
    }
  }, [isConfirmModalOpen]);

  return (
    <dialog
      ref={confRef}
      onCancel={closeConfirmModal}
      className="confirmation-dialog"
    >
      <div className="confirmation-wrapper">
        <h2>Do you really want to proceed with this Action ?</h2>
        <div className="buttons">
          <button
            className="confirm"
            onClick={(e) => {
              callBack();
              closeConfirmModal();
            }}
          >
            Confirm
          </button>
          <button
            className="cancel"
            onClick={(e) => {
              closeConfirmModal();
              reset();
              if (isEditing) {
                setIsEditing(!isEditing);
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
