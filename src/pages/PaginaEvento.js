import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const PaginaEvento = () => {
    const [evento, setEvento] = useState({});
    const id = useParams().id;

    useEffect(() => {
        axios.get(`https://examen-web-back.vercel.app/eventos/id/${id}`)
            .then(response => {
                if (response.data !== null) {
                    setEvento(response.data);
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`https://examen-web-back.vercel.app/id/${evento.imagen}`)
            .then(response => {
                if (response.data !== null) {
                    setEvento(response.data);
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            });
    }, []);

    const handleBorrar = async () => {
        try {
          await axios.delete(`https://examen-web-back.vercel.app/eventos/id/${id}`);
          history.push('/'); // Redirigir a la página principal o a donde desees después de borrar
        } catch (error) {
          console.error('Error al borrar el evento:', error);
        }
      };

    const handelUpdate = async () => {
        e.preventDefault();
        try {
          await axios.put(`https://examen-web-back.vercel.app/eventos/id/${id}`, evento);
          // Puedes redirigir al usuario a la página de detalles después de la actualización
          // o realizar otras acciones necesarias
        } catch (error) {
          console.error('Error al actualizar el evento:', error);
        }
      };



    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Navbar />
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h1 className="card-title">{evento.nombre}</h1>
            <h2 className="card-text">Descripcion: {evento.descripcion}</h2>
            <h2 className="card-text">Organizador: {evento.organizador}</h2>
            <h2 className="card-text">Fecha: {evento.fecha}</h2>
            <h2 className="card-text">Latitud: {evento.lat}</h2>
            <h2 className="card-text">Longitud: {evento.lon}</h2>
            <h2 className="card-text">Imagen: {evento.imagen}</h2>

            <button className="btn btn-primary" onClick={handleBorrar}>
                Borrar
            </button>
          </div>
        </div>
      </div>
    );
}

export default PaginaEvento;
