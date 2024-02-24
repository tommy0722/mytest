import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Roulette from './Roulette';
import UpdatePage from './UpdatePage';
import './App.css'; // 確保這行代碼被包含
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App"> {/* 使用App類來應用樣式 */}
      <Router>
        <div className="App-container"> {/* 使用App-container類來實現置中布局 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roulette/:id" element={<Roulette />} />
            <Route path="/update/:id" element={<UpdatePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
