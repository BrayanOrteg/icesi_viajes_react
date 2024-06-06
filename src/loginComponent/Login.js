import React, { useState } from 'react';
import './Login.css';
import logo from './assets/logo_icesi.png';
import { request, setAuthHeader, setUser, setUserId} from '../axios_helper';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login({role}) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userName === "" || password === ""){
            return
        }
        onLogin(e, userName, password);
    };


    const onLogin = (event, userName, password) => {
        request(
            "POST",
            "api/v1/users/login",
            {
                login: userName,
                password: password
            }).then(
            (response) => {

                setAuthHeader(response.data.token);
                setUser(response.data.name);
                setUserId(response.data.id)
                const decoded = jwtDecode(response.data.token);
                role(decoded.role);
                navigate('/home');

            }).catch(
            (error) => {
                setAuthHeader(null);
                setError(true)
            }
        );
    };

        return (
            <html className='login-html-body'>
                <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
                <body className='login-html-body'>


                    <div className='circle-login-1'></div>
                    <div className='circle-login-2'></div>
                    <div className='rectangle-login'></div>

                    <div className='container-login'>

                        <div className='welcome'>

                            <img src={logo} className='logoApplication'/>
                            
                            <div className='textWelcomeContainer'>
                                <h1 className='whiteText' id='welcomeText'>
                                Bienvenido!
                                </h1>
                                <p className='whiteText'>
                                    Por favor ingresa tus credenciales para continuar
                                </p>
                            </div>
        
                        </div>
                        <div className="userLogin">
                            <h2>Inicio de Sesión</h2>
                            <form id= "login" onSubmit={handleSubmit}>
                        
                                <input className='loginInput' type="text" placeholder='Usuario' name="userName" onChange={(e) => setUserName(e.target.value)} />
                                
                            
                                <input className='loginInput' type="password" placeholder='Contraseña' name="password" onChange={(e) => setPassword(e.target.value)}/>
                            
                                <button type="submit">Iniciar Sesión</button>   
                            </form>
                            {error && <h4 className='error-text'> ¡Usuario o contraseña incorrectos!</h4>}
                        </div>
                    </div>
                    
                </body>
                
            </html>

            
        );
}

