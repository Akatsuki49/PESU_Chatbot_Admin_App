import React, { useEffect, useRef, useState } from 'react';
import './styles/AddQA_Screen.css';
import { useAddSingleQA } from '../hooks/useAddSingleQA';
import { useAddFile } from '../hooks/useAddFile';

const AddQA_Screen = ({ isModalOpen, closeModal }) => {
  const { QaForm, handleSingleQASubmit, handleChange } = useAddSingleQA();
  const { file, handleFileChange, handleFileSubmit } = useAddFile();
  // const [isSingleQA, setIsSingleQA] = useState(null);
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
      <form onSubmit={handleSingleQASubmit}>
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
      <form onSubmit={handleFileSubmit}>
        <label htmlFor="file">Upload File:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
        <button type="submit">Submit File QA</button>
      </form>
    );
  };
  // const selectOptionForm = () => {
  //   console.log('selectOptionForm rendered');
  //   const handleOptionSelect = (e) => {
  //     e.preventDefault(); // Prevent form submission and page refresh
  //     const selectedOption = document.getElementById('option').value;
  //     if (selectedOption === 'single') {
  //       setIsSingleQA(true);
  //     } else if (selectedOption === 'file') {
  //       setIsSingleQA(false);
  //     }
  //   };
  //   return (
  //     <form onSubmit={handleOptionSelect}>
  //       <label htmlFor="option">Select Option:</label>
  //       <select id="option" name="option">
  //         <option value="single">Single QA</option>
  //         <option value="file">File QA</option>
  //       </select>
  //       <button type="submit">Submit</button>
  //     </form>
  //   );
  // };

  return (
    <dialog ref={dialogRef} open={isModalOpen} onCancel={closeModal}>
      <div className="QuestionFormDiv" ref={wrapperRef}>
        <div className="header">
          <h3>Add Question(s)</h3>
          <button onClick={() => setIsSingleQA(!isSingleQA)}>
            {isSingleQA ? 'File QA' : 'Single QA'}
          </button>
        </div>
        {isSingleQA ? singleQA_Form() : fileQA_Form()}
      </div>
      {/* {isSingleQA === null || isSingleQA === undefined ? (
        selectOptionForm()
      ) : (
        <div className="QuestionFormDiv" ref={wrapperRef}>
          <h3>Add a Question</h3>
          {isSingleQA ? singleQA_Form() : fileQA_Form()}
        </div>
      )} */}
    </dialog>
  );
};

export default AddQA_Screen;
