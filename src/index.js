import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubirFoto from './pages/SubirFoto.js';
import CrearEvento from './pages/CrearEvento.js';
import Logs from './pages/Logs.js';
import PaginaEvento from './pages/PaginaEvento.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/subir" element={<SubirFoto />} />
          <Route path='/logs' element={<Logs />} />
          <Route path="/crear" element={<CrearEvento/>} />
          <Route path="/paginaEvento/:id" element={<PaginaEvento/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
  </React.StrictMode>
);

