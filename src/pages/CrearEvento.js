import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import axios from 'axios';


const CrearEvento= () => {
    const user = [];
    const [showAlert, setShowAlert] = useState(false);
  
    const handleClick = () => {
      setShowAlert(true);
    };
  
    const funcionGuardar = async (e) => {
      e.preventDefault();
      const nombre = e.target.nombre.value;
      const timestamp = e.target.timestamp.value;
      const lugar = e.target.lugar.value;
      const imagen = e.target.imagenes.files[0]; // Solo tomamos la primera imagen
    
      try {
        // Obtener coordenadas de la dirección de manera asíncrona
        const response = await axios.get(`https://examen-web-back.vercel.app/map/direccionCoordenadas/${lugar}`);
        const lat = response.data.lat;
        const lon = response.data.lon;
    
        // Subir la imagen a Cloudinary y obtener la URL
        const formData = new FormData();
        formData.append('imagen', imagen);
    
        const cloudinaryResponse = await axios.post('https://examen-web-back.vercel.app/cloudinary/subirFoto', formData);
        const imagenUrl = cloudinaryResponse.data.secure_url;
    
        // Crear el objeto de evento después de obtener las coordenadas y la URL de la imagen
        const evento = {
          nombre: nombre,
          timestamp: timestamp,
          lat: lat,
          lon: lon,
          imagen: imagenUrl,
        };
    
        // Crear el evento en la base de datos
        const createEventResponse = await axios.post('https://examen-web-back.vercel.app/eventos/', evento);
        const { data } = createEventResponse;
        console.log(data);
    
      } catch (error) {
        // Manejar errores
        console.log(error);
      }
    };
    
    
  
    return (
      <div>
        <Navbar />
        <div  className="container-lg mt-4 mb-5">
          <div  className="card" style={{ width: "100%", marginTop: "10%" }}>
            <div className="card-header"></div>
            <div className="card-body">
              <h1 className="card-title Subir" style={{ textAlign: "center" }}>
                Crear Evento
              </h1>
              <form onSubmit={funcionGuardar}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre 
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                  />
                </div>
                <div className="mb-4 ms-2" >
                  <label htmlFor="desc" className="form-label">
                    Lugar
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    name="lugar"
                  />
                </div>
                <div className="mb-4 ms-2" >
                  <label htmlFor="desc" className="form-label">
                    Fecha
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    name="timestamp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imagenes" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="imagenes"
                    multiple
                    required
                  />
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "2%" }}
                  type="submit"
                >
                  Subir Producto
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
      
  };

export default CrearEvento;
