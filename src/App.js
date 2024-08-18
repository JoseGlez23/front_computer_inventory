import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Computadoras from './pages/Computadoras';
import AgregarComputadora from './pages/AgregarComputadora';
import EditarComputadora from './pages/EditarComputadora';
import GraficaEstado from './pages/GraficaEstado';
import Login from './pages/Login';
import Layout from './pages/Layout';

function App() {
  const [isAuth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setAuth(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setAuth(false);
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} setUsername={setUsername} />} />
        {isAuth ? (
          <Route path="/" element={<Layout username={username} handleLogout={handleLogout} />}>
            <Route index element={<Home />} />
            <Route path="computadoras" element={<Computadoras />} />
            <Route path="agregar" element={<AgregarComputadora />} />
            <Route path="editar/:id" element={<EditarComputadora />} />
            <Route path="graficas" element={<GraficaEstado />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
