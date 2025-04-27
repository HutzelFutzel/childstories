import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import PromptPage from './pages/PromptPage';


export const PromptPageRoute = '/';

function App() {
  return (
    <Router>

      <div className='flex-grow'>
        <Routes>
          <Route path={PromptPageRoute} element={<PromptPage />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
