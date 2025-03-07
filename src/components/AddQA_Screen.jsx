import React, { useState } from 'react';
import axios from 'axios';
import './styles/AddQA_Screen.css';
import { useAddSingleQA } from '../hooks/useAddSingleQA';
import { useAddFile } from '../hooks/useAddFile';

const AddQA_Screen = () => {
  const { QaForm, handleSingleQASubmit, handleChange } = useAddSingleQA();
  const { file, handleFileChange, handleFileSubmit } = useAddFile();

  return (
    <div className="QuestionFormDiv">
      <h3>Add a Question</h3>
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

      <form onSubmit={handleFileSubmit}>
        <label htmlFor="file">Upload File:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AddQA_Screen;
