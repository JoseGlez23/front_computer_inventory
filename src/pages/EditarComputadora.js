import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarComputadora() {
  const { id } = useParams();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroserie, setNumeroSerie] = useState('');
  const [stock, setStock] = useState(0);
  const [estado, setEstado] = useState('disponible');
  const [fecha, setFecha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchComputadora();
  }, []);

  const fetchComputadora = async () => {
    try {
      const response = await axios.get(`https://integradora2.onrender.com/api/computadoras/${id}`);
      const computadora = response.data;
      setMarca(computadora.marca);
      setModelo(computadora.modelo);
      setNumeroSerie(computadora.numeroserie);
      setStock(computadora.stock);
      setEstado(computadora.estado);
      setFecha(computadora.fecha.slice(0, 10));
    } catch (error) {
      console.error('Error al obtener la computadora', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://integradora2.onrender.com/api/computadoras/${id}`, {
        marca,
        modelo,
        numeroserie,
        stock: parseInt(stock) || 0,
        estado,
        fecha,
      });
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar la computadora', error);
    }
  };

  const handleStockChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setStock(''); 
    } else if (/^\d+$/.test(value)) { 
      setStock(parseInt(value, 10)); 
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Computadora</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            className="form-control"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            className="form-control"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Numero de Serie</label>
          <input
            type="text"
            className="form-control"
            value={numeroserie}
            onChange={(e) => setNumeroSerie(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number" 
            className="form-control"
            value={stock === '' ? '' : stock} 
            onChange={handleStockChange} 
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            className="form-control"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="disponible">Disponible</option>
            <option value="no disponible">No Disponible</option>
          </select>
        </div>
        <div className="form-group">
          <label>Fecha de Compra</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarComputadora;
