import React, { useState, useEffect } from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import axios from 'axios';
import Navbar from './components/NavBar';

function App() {
  const urlBackend = 'https://examen-web-back-luis-projects-46e18a31.vercel.app';
  const [eventos, setEventos] = useState([]);
  const [pulsado, setPulsado] = useState(false);

  const encontrarPorDireccion = async (e) => {
    e.preventDefault();
    const direccion = document.getElementById("direccion").value;
    
    try {
      const direccionCoordenadasResponse = await axios.get(`https://examen-web-back.vercel.app/map/direccionCoordenadas/${direccion}`);
      const { lat, lon } = direccionCoordenadasResponse.data;
      console.log(lat, lon);
      const eventosResponse = await axios.get(`https://examen-web-back.vercel.app/eventos/lat/${lat}/lon/${lon}`);
      
      document.getElementById("direccion").value = "";
      setPulsado(true);
      setEventos(eventosResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <form>
          <div className="form-group">
            <label htmlFor="codLinea">Encontrar eventos cerca de la direccion</label>
            <input type="text" className="form-control" id="direccion" placeholder="Direccion" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={encontrarPorDireccion}>
            Buscar
          </button>
        </form>
        <div>
          <a  style={{marginTop: '20%'}} type="submit" className="btn btn-primary" href='/crear'>
            Crear Evento
          </a>
        </div>
        {pulsado && (
          <div style={{marginTop: "2%"}} className="container">
            <div className="row">
              Eventos:
              {eventos.map((evento, index) => (
                <div className="col-sm" key={evento.id}>
                  <div className="card">
                    <div className="card-body">
                      <a className="card-title" href={`/paginaEvento/${evento._id}`} key={index}>{evento.nombre}</a>
                      <p className="card-text">{evento.descripcion}</p>
                      <p className="card-text">{evento.organizador}</p>
                      <p className="card-text">{evento.fecha}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );  
}

export default App;
