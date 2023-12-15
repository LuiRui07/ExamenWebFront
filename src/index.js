import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubirFoto from './pages/SubirFoto.js';
import Logs from './pages/Logs.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/subir" element={<SubirFoto />} />
          <Route path='/logs' element={<Logs />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
  </React.StrictMode>
);

