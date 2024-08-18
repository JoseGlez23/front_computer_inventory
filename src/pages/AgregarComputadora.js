import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AgregarComputadora() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroserie, setNumeroSerie] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [fecha, setFecha] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://integradora2.onrender.com/api/computadoras", {
        marca,
        modelo,
        numeroserie,
        estado,
        fecha,
        stock: Number(stock), // Convertir a número antes de enviar
      });
      navigate("/");
    } catch (error) {
      console.error("Error al agregar la computadora", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleStockChange = (e) => {
    const value = e.target.value;

    if (value === "" || value === "0") {
      setStock("");
    } else {
      setStock(value);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Computadora</h2>
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
          <label>Número de Serie</label>
          <input
            type="text"
            className="form-control"
            value={numeroserie}
            onChange={(e) => setNumeroSerie(e.target.value)}
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
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label>Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={handleStockChange}
            required
            min="0"
            placeholder="0" 
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mr-2">
            Agregar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AgregarComputadora;
