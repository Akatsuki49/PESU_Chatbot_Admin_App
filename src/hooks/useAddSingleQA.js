import { useState } from 'react';

export const useAddSingleQA = () => {
  const [QaForm, setQaForm] = useState({
    question: '',
    answer: '',
  });

  const handleSingleQASubmit = async (e) => {
    e.preventDefault();
    if (!QaForm.question.trim()) {
      console.error('Question cannot be empty');
      return;
    } else if (!QaForm.answer.trim()) {
      console.error('Answer cannot be empty');
      return;
    }

    console.log('Submitting QA:', QaForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQaForm((prevQaForm) => ({
      ...prevQaForm,
      [name]: value,
    }));
  };

  return { QaForm, handleSingleQASubmit, handleChange };
};
