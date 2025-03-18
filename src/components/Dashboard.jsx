import React, { useContext, useEffect, useState } from 'react';
import mockData from '../MockData/QAFetchedCards.json';
import Card from './Card';
import AddQA_Screen from './AddQA_Screen';
import './styles/Dashboard.css';
import ReviewModal from './ReviewModal';
import { QAContext } from '../context/QAContextProvider';

const Dashboard = () => {
  // update, delete operations for each card retured from BE
  // const [Cards, setCards] = useState([]);
  const { qaList, addQA, updateQA, removeQA } = useContext(QAContext);
  const [isAddBtnModalOpen, setIsAddBtnModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { output, status, error } = await getData();
      if (status === 200) {
        for (let i = 0; i < output.data.length; i++) {
          addQA(output.data[i]);
        }
      } else {
        console.log(error);
      }
    })();
  }, []);

  const getData = async () => {
    try {
      const response = new Promise((resolve) => {
        resolve({ output: mockData, status: 200, error: null });
      });
      return response;
    } catch (error) {
      return { output: {}, status: 500, error: error };
    }
  };

  const renderQAList = qaList.filter((qa) => qa.status === 1);
  const pendingQAList = qaList.filter((qa) => qa.status === 0);

  return (
    <>
      <div className="Dashboard">
        <h1>Dashboard</h1>
        {renderQAList.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              deleteCard={removeQA}
              updateCard={updateQA}
            />
          );
        })}
        <button onClick={() => setIsAddBtnModalOpen(true)} id="addBtn">
          +
        </button>
        {pendingQAList.length > 0 && (
          <button id="reviewBtn" onClick={() => setIsReviewModalOpen(true)}>
            Review
          </button>
        )}
      </div>
      <AddQA_Screen
        isModalOpen={isAddBtnModalOpen}
        closeModal={() => setIsAddBtnModalOpen(false)}
      />
      {isReviewModalOpen && pendingQAList.length > 0 && (
        <ReviewModal
          isModalOpen={isReviewModalOpen}
          closeModal={() => setIsReviewModalOpen(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
