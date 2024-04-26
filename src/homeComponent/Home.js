import React from 'react';
import './Home.css';

function Home({user, setUser}){


    
  const handleLogout = async (e) => {
    e.preventDefault();
    setUser([ ])
  };


    return (
        <html className='home-html-body'>
          <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
          <body className='home-html-body'>

              <button type="submit" onClick={handleLogout} >Cerrar Sesión</button>


              <div className='circle-home'> </div>
    
          </body>
        </html>
        

        
    );
}

export default Home;