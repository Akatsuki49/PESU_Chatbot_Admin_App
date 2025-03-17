import { useContext, useState } from 'react';
import { QAContext } from '../context/QAContextProvider';

export const useAddSingleQA = () => {
  const [QaForm, setQaForm] = useState({
    question: '',
    answer: '',
  });

  const { addQA } = useContext(QAContext);

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
    addQA(QaForm);

    setQaForm({
      question: '',
      answer: '',
    });
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
