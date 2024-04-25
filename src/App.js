import './App.css';
import Login from './loginComponent/Login';
import Home from './homeComponent/Home';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState([])
  return (
    <div>

    {!user.length > 0 ? (
      <Login setUser={setUser} />
    ) : (
      <Home user={user} setUser={setUser} />
    )}
    
  </div>
  );
}

export default App;
