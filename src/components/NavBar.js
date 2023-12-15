import React from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Login from './Login.js';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {

return (
    <nav className=''>
            <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
                    </button>
                            <div className="navbar-nav" style={{ display: 'flex', alignItems: 'center' }}>
                                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                                <a className="nav-link" href="/subir">Subir Foto</a>
                                <a className="nav-link"  href="/logsInicioSesion">Logs</a>
                            </div>
                            <div>
                            <Login/>
                            </div>  
                </div>
            </div>
        </nav>
    );
} 

export default Navbar;