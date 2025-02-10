import React, { useState } from 'react';
import axios from 'axios';
import './styles/AddQA_Screen.css';

const AddQA_Screen = () => {
  const [QaForm, setQaForm] = useState({
    question: '',
    answer: '',
  });

  const [showAnswerInput, setShowAnswerInput] = useState(false);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!QaForm.question.trim()) {
      console.error('Question cannot be empty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/question', {
        question: QaForm.question,
      });
      if (response.status === 200) {
        console.log('Question sent to server successfully:', response.data);
        const { message } = response.data;
        if (
          message === "Such Question doesn't exist. You can add your answer."
        ) {
          setShowAnswerInput(true);
        } else if (
          message === 'A similar question already exists in the dataset.'
        ) {
          setShowAnswerInput(false);
        } else {
          setShowAnswerInput(false);
        }
      } else {
        console.log(
          'Unsuccessful response from server:',
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error('Error sending question to server:', error);
    } finally {
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!QaForm.answer.trim()) {
      console.error('Answer cannot be empty');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/add_question_answer',
        {
          question: QaForm.question,
          answer: QaForm.answer,
        }
      );
      if (response.status === 200) {
        console.log('Answer sent to server successfully:', response.data);
        setShowAnswerInput(false);
      } else {
        console.log(
          'Unsuccessful response from server:',
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error('Error sending answer to server:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQaForm((prevQaForm) => ({
      ...prevQaForm,
      [name]: value,
    }));
  };
  return (
    <div className="QuestionFormDiv">
      <h3>Add a Question</h3>
      <form onSubmit={handleQuestionSubmit}>
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
        <button
          type="submit"
          style={{ pointerEvents: showAnswerInput ? 'none' : 'auto' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQA_Screen;
