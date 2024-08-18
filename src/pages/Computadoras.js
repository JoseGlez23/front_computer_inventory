import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

function Computadoras() {
  const [computadoras, setComputadoras] = useState([]);

  useEffect(() => {
    axios.get('/')
      .then(response => {
        setComputadoras(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las computadoras:', error);
      });
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Lista de Computadoras</h1>
      <ul>
        {computadoras.map(computadora => (
          <li key={computadora._id} className="mb-4">
            {computadora.marca} - {computadora.modelo} - {computadora.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Computadoras; 
