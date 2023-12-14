import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { UserProvider} from './hooks/UserContentHook';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import SubirFoto from './pages/SubirFoto.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>    
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/subir" element={<SubirFoto />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);

