import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5001/api');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
          console.log(data);
        } else {
          console.error('Error al obtener Usuarios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener Usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hermano aqui estamos
        </p>
        <ul>
          {usuarios.map(producto => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a>
      </header>
    </div>
  );
}

export default App;
