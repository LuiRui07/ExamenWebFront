import React, { useState } from 'react';
import axios from 'axios';


const SubirFoto= () => {
    const user = [];
    const [showAlert, setShowAlert] = useState(false);
  
    const handleClick = () => {
      setShowAlert(true);
    };
  
    const funcionGuardar = (e) => {
      e.preventDefault();

      // Verificar si el usuario está autenticado
      const isUserAuthenticated = new Date(localStorage.getItem("caducidad")) > new Date();

      if (!isUserAuthenticated) {
        alert("Debes iniciar sesión para subir fotos.");
        return;
      }

      const descripcion = e.target.descripcion.value;
      const nombre = e.target.nombre.value;
      const imagenes = e.target.imagenes.files;
  
      // Mapa de promesas de subida de imágenes
      const cloudinaryUploadPromises = Array.from(imagenes).map((imagen) => {
        const formData = new FormData();
        formData.append('imagen', imagen);
  
        // Devolvemos la promesa de la subida de la imagen
        return axios.post('https://examen-web-back-luis-projects-46e18a31.vercel.app/cloudinary/subirFoto', formData)
          .then((response) => response.data.secure_url);
  
      });
  
      // Resolvemos todas las promesas de subida de imágenes
      Promise.all(cloudinaryUploadPromises)
        .then((imagenesUrls) => {
          const producto = {
            descripcion: descripcion,
            nombre: nombre,
            imagenes: imagenesUrls,
          };
          console.log('Producto a crear:', producto);
          // Ahora, puedes hacer la solicitud para crear el producto
          ///return axios.post('http://localhost:5001/productos/', producto);
        })
        //.then((response) => {
        //  const { data } = response;
        //  const { message } = data;
        //  console.log(data);
        //})
        //.catch((error) => {
        //  console.log(error);
        //});
    };
  
    return (
      <div>
        <div className="container-lg mt-4 mb-5">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-header"></div>
            <div className="card-body">
              <h1 className="card-title Subir" style={{ textAlign: "center" }}>
                Subir Foto
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
                    required
                  />
                </div>
                <div className="mb-4 ms-2" >
                  <label htmlFor="desc" className="form-label">
                    Descripción
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    name="descripcion"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imagenes" className="form-label">
                    Imágenes (Máximo 5)
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

export default SubirFoto;
