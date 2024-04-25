import React from 'react';
import './Home.css';

function Home({user, setUser}){


    
  const handleLogout = async (e) => {
    e.preventDefault();
    setUser([ ])
  };


    return (
        <html className='home-html-body'>
          <body className='home-html-body'>

            <div className="container-home">
              <h1>Bienvenido</h1>
              <h2>{user}</h2>

              <button type="submit" onClick={handleLogout} >Cerrar Sesión</button>
            </div>
          </body>
        </html>
        

        
    );
}

export default Home;