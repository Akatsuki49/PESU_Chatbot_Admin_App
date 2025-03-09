import React, { useEffect, useId, useState } from 'react';
import mockData from '../MockData.json';
import Card from './Card';
import AddQA_Screen from './AddQA_Screen';
import './styles/Dashboard.css';

const Dashboard = () => {
  // update, delete operations for each card retured from BE
  const [Cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const updateCard = (id, updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? updatedCard : card))
    );
  };

  useEffect(() => {
    (async () => {
      const { output, status, error } = await getData();
      if (status === 200) {
        setCards(output.data);
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
  return (
    <>
      <div className="Dashboard">
        <h1>Dashboard</h1>
        {Cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
          );
        })}
        <button onClick={() => setIsModalOpen(true)} id="addBtn">
          +
        </button>
      </div>
      <AddQA_Screen
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;
