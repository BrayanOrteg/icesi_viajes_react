import React, { useState } from 'react';
import './Login.css';
import logo from './assets/logo_icesi.png';

function Login({setUser}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userName === "" || password === ""){
        setError(true)
        return
    }
    setError(false)

    setUser([userName])
  };

  return (
    <html>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <body>
            <div className='container'>
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
                
                        <input className='loginInput' type="text" placeholder='Usuario' value={userName} onChange={(e) => setUserName(e.target.value)} />
                        
                      
                        <input className='loginInput' type="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                       
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    {error && <p>Se deben llenar todos los campos</p>}
                </div>
            </div>
            
        </body>
        
    </html>
    

    
  );
}

export default Login;
