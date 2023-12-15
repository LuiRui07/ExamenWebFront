import React, { useState, useEffect } from 'react';
import './css/App.css';
import Login from './components/Login';
import Mapa from './components/Mapa';


function App() {
  const [usuarios, setUsuarios] = useState([]);
  const urlBackend = 'https://examen-web-back-luis-projects-46e18a31.vercel.app';

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch(urlBackend + '/api/');
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
        <Login />
        <p>
          Hermano aqui estamos
        </p>
        <a href = '/logs'> Logs </a>
        <a href='/subir'> Nos vamos </a>
        <ul>
          AQUI
          {usuarios.map(producto => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
        </ul>
      </header>
      <Mapa />
    </div>
  );
}

export default App;
