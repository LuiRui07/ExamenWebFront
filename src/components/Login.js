import React from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const Login = () => {


    async function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential);
        localStorage.setItem("token", response.credential);
        localStorage.setItem("caducidad",new Date(userObject.exp * 1000));
        localStorage.setItem("email", userObject.email);
        localStorage.setItem("name", userObject.name);
        localStorage.setItem("picture", userObject.picture);
        localStorage.setItem("cargado", true);

        await axios.post('https://examen-web-back.vercel.app/logs', {
            timestamp: new Date(),
            usuario: userObject.email,
            caducidad: new Date(userObject.exp * 1000),
            token: response.credential
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


        window.location.href = "https://examen-web-front.vercel.app";
    }


    useEffect(() => {
        // Verificar si el objeto 'google' está disponible
        if (window.google && window.google.accounts && window.google.accounts.id) {
            // Inicializar Google Sign-In
            window.google.accounts.id.initialize({
                client_id: '125549162694-dmj5gauc815vss9fnlo3ju6qeke9d2ea.apps.googleusercontent.com',
                callback: handleCallbackResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById('sigInDiv'),
                { theme: 'outline', size: 'large', text: 'signIn', width: '300px', height: '50px' }
            );

        } else {
            console.error("El objeto 'google' no está disponible.");
        }
    }, [handleCallbackResponse])

    return (
        <nav className=''>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                            {localStorage.getItem("cargado") ? <><a className='nombreInicioSesion' style={{marginRight: '2%'}}>Bienvenid@ {localStorage.getItem("name")}</a> 
                                                                <button className='btn btn-danger' onClick={() => {
                                                                    localStorage.clear();
                                                                    window.location.href = "https://examen-web-front.vercel.app";}}>Cerrar sesion</button></>
                            : <div id="sigInDiv" className='googlePonerDerecha'></div>}
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Login;