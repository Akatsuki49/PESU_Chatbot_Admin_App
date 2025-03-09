import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the App</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
