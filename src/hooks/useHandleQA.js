import { useState } from 'react';

export const useHandleQA = () => {
  //format:
  // id - {question: "", answer: "", similar: [{id: "", question: "", answer: ""}], status: <int> (0: pending, 1: approved, 2: rejected)}
  const [qaList, setQaList] = useState([]);

  const addQA = (newQA) => {
    if (newQA.status === undefined) newQA.status = 0;

    if (newQA.id === undefined) newQA.id = crypto.randomUUID();
    //can make api call here and fetch the similar questions
    const dummySimilarQuestions = [
      {
        id: '1',
        question: 'What is the capital of France?',
        answer: 'Paris',
      },
      {
        id: '2',
        question: 'What is the largest planet in our solar system?',
        answer: 'Jupiter',
      },
      {
        id: '3',
        question: 'What is the smallest planet in our solar system?',
        answer: 'Mercury',
      },
    ];
    const toAddQA = {
      ...newQA,
      similar: dummySimilarQuestions,
    };
    setQaList((prevQaList) => [...prevQaList, toAddQA]);
  };

  const updateQA = (id, updatedQA) => {
    setQaList((prevQaList) =>
      prevQaList.map((qa) => (qa.id === id ? updatedQA : qa))
    );
  };

  const approveQA = (id) => {
    console.log(id);
    console.log(qaList);
    setQaList((prevQaList) =>
      prevQaList.map((qa) => (qa.id === id ? { ...qa, status: 1 } : qa))
    );
  };

  const rejectQA = (id) => {
    setQaList((prevQaList) =>
      prevQaList.map((qa) => (qa.id === id ? { ...qa, status: 2 } : qa))
    );
  };

  const removeQA = (id) => {
    setQaList((prevQaList) => prevQaList.filter((qa) => qa.id !== id));
  };

  return { qaList, addQA, updateQA, approveQA, rejectQA, removeQA };
};
