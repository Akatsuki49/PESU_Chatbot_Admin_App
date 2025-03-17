import React, { useEffect, useRef, useState } from 'react';
import './styles/AddQA_Screen.css';
import { useAddSingleQA } from '../hooks/useAddSingleQA';
import { useAddFile } from '../hooks/useAddFile';

const AddQA_Screen = ({ isModalOpen, closeModal }) => {
  const { QaForm, handleSingleQASubmit, handleChange } = useAddSingleQA();
  const { handleFileChange, handleFileSubmit } = useAddFile();
  const [isSingleQA, setIsSingleQA] = useState(true);

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

  const singleQA_Form = () => {
    return (
      <form onSubmit={handleSingleQASubmit} className="form singleQA">
        <label htmlFor="question">Question:</label>
        <textarea
          type="text"
          placeholder="Question"
          name="question"
          id="question"
          value={QaForm.question}
          onChange={handleChange}
        />
        <label htmlFor="answer">Answer:</label>
        <textarea
          type="text"
          placeholder="Answer"
          name="answer"
          id="answer"
          value={QaForm.answer}
          onChange={handleChange}
        />
        <button type="submit">Submit Single QA</button>
      </form>
    );
  };

  const fileQA_Form = () => {
    return (
      <form onSubmit={handleFileSubmit} className="form fileQA">
        <label htmlFor="file">Upload File:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
        <button type="submit">Submit File QA</button>
      </form>
    );
  };

  return (
    <dialog ref={dialogRef} open={isModalOpen} onCancel={closeModal}>
      <div className="QuestionFormDiv" ref={wrapperRef}>
        <div className="header">
          <button onClick={closeModal}>X</button>
          <h3>Add Question(s)</h3>
          <button onClick={() => setIsSingleQA(!isSingleQA)}>
            {isSingleQA ? 'File QA' : 'Single QA'}
          </button>
        </div>
        {isSingleQA ? singleQA_Form() : fileQA_Form()}
      </div>
    </dialog>
  );
};

export default AddQA_Screen;
