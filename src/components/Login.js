import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setIsLoginDisabled(true);
      setLoginError('');
      console.log('User authenticated');
    } else {
      setLoginError('Email or password is incorrect.');
      console.error('Error signing in');
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    setSuccessMessage(''); // Reset success message
    if (!question.trim()) {
      console.error('Question cannot be empty');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/question', { question });
      if (response.status === 200) {
        console.log('Question sent to server successfully:', response.data);
        const { message } = response.data;
        if (message === "Such Question doesn't exist. You can add your answer.") {
          setShowAnswerInput(true);
          setErrorMessage('');
        } else if (message === "A similar question already exists in the dataset.") {
          setShowAnswerInput(false);
          setErrorMessage(message);
        } else {
          setShowAnswerInput(false);
          setErrorMessage('');
        }
      } else {
        console.log('Unsuccessful response from server:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error sending question to server:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      console.error('Answer cannot be empty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/add_question_answer', { question, answer });
      if (response.status === 200) {
        console.log('Answer sent to server successfully:', response.data);
        setShowAnswerInput(false);
        setSuccessMessage('Question and answer added successfully.');
      } else {
        console.log('Unsuccessful response from server:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error sending answer to server:', error);
    }
  };

  return (
    <div className="Login">
      {!isAuthenticated && <h2>Login</h2>}
      {!isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginDisabled}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoginDisabled}
          />
          <button type="submit" disabled={isLoginDisabled}>Login</button>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </form>
      )}

      {isAuthenticated && (
        <div className="QuestionForm">
          <h3>Add a Question</h3>
          <form onSubmit={handleQuestionSubmit}>
            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={showAnswerInput}
            />
            <button type="submit" disabled={showAnswerInput} style={{ pointerEvents: showAnswerInput ? 'none' : 'auto' }}>Submit</button>
          </form>
          {isLoading && <p>Loading...</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {showAnswerInput && (
            <form onSubmit={handleAnswerSubmit}>
              <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button type="submit">Submit Answer</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
