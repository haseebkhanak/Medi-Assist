import React, { useState,useEffect } from 'react';
import { useNavbar } from './NavbarContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const  {setNavbarType}  = useNavbar();

  useEffect(() => {
    setNavbarType("login");
  }, [setNavbarType]);


  const handleLogin = () => {
    if (username.trim()) {
      alert(`Welcome, ${username}!`);
    } else {
      alert('Please enter a valid username.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
