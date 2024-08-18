import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [computadoras, setComputadoras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComputadoras();
  }, []);

  const fetchComputadoras = async () => {
    try {
      const response = await axios.get('https://integradora2.onrender.com/api/computadoras');
      setComputadoras(response.data);
    } catch (error) {
      console.error('Error al obtener las computadoras', error);
    }
  };

  const deleteComputadora = async (id) => {
    try {
      await axios.delete(`https://integradora2.onrender.com/api/computadoras/${id}`);
      fetchComputadoras(); 
    } catch (error) {
      console.error('Error al eliminar la computadora', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4 animate-fadeIn">Lista de Computadoras</h2>
          <Link to="/agregar" className="btn btn-primary mb-4 animate-pulse">Agregar Computadora</Link>
          <table className="table table-striped table-hover shadow-sm animate-fadeIn">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Número de Serie</th>
                <th>Stock</th> 
                <th>Fecha de Compra</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {computadoras.map((computadora) => (
                <tr key={computadora._id} className="hover:bg-gray-100 transition ease-in-out duration-200">
                  <td>{computadora.marca}</td>
                  <td>{computadora.modelo}</td>
                  <td>{computadora.numeroserie}</td>
                  <td>{computadora.stock}</td> {/* Mostrando el campo Stock */}
                  <td>{new Date(computadora.fecha).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/editar/${computadora._id}`} className="btn btn-info btn-sm mr-2 transition ease-in-out duration-200">Editar</Link>
                    <button 
                      onClick={() => deleteComputadora(computadora._id)} 
                      className="btn btn-danger btn-sm transition ease-in-out duration-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
