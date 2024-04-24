function Home({user, setUser}){


    
  const handleLogout = async (e) => {
    e.preventDefault();
    setUser([ ])
  };


    return (
        <div className="container">
          <h1>Bienvenido</h1>
          <h2>{user}</h2>

          <button type="submit" onClick={handleLogout} >Cerrar Sesión</button>
        </div>

        
    );
}

export default Home;