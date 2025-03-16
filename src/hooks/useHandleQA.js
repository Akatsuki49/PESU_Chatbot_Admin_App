import { useState } from 'react';

export const useHandleQA = () => {
  //format:
  // id - {question: "", answer: "", similar: [{id: "", question: "", answer: ""}], status: <int> (0: pending, 1: approved, 2: rejected)}
  const [qaList, setQaList] = useState([]);

  const addQA = (newQA) => {
    newQA.status = 0;
    setQaList((prevQaList) => [...prevQaList, newQA]);
  };

  const approveQA = (id) => {
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

  return { qaList, addQA, approveQA, rejectQA, removeQA };
};
