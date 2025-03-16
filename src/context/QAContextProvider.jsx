import { createContext } from 'react';
import { useHandleQA } from '../hooks/useHandleQA';

export const QAContext = createContext();

export const QAContextProvider = ({ children }) => {
  const { qaList, addQA, approveQA, rejectQA, removeQA } = useHandleQA();
  return (
    <QAContext.Provider
      value={{ qaList, addQA, approveQA, rejectQA, removeQA }}
    >
      {children}
    </QAContext.Provider>
  );
};
