import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Registrar los elementos necesarios
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip);

function GraficaEstado() {
  const [stockData, setStockData] = useState(null);
  const [fechasData, setFechasData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://integradora2.onrender.com/api/computadoras"
        );
        const computadoras = response.data;

        // Prepara los datos para la gráfica de stock
        const labels = computadoras.map(
          (computadora) => computadora.marca + " " + computadora.modelo
        );
        const stockValues = computadoras.map(
          (computadora) => computadora.stock
        );

        const backgroundColors = stockValues.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
        const borderColors = stockValues.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
        );

        setStockData({
          labels: labels,
          datasets: [
            {
              label: "Stock de Computadoras",
              data: stockValues,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
          options: {
            plugins: {
              tooltip: {
                enabled: true,
              },
            },
          },
        });

        const fechas = Array(12).fill(0);

        computadoras.forEach((computadora) => {
          const fecha = new Date(computadora.fecha);
          const mes = fecha.getMonth();
          fechas[mes] += 1;
        });

        setFechasData({
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          datasets: [
            {
              label: "Computadoras Adquiridas por Mes",
              data: fechas,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
          options: {
            plugins: {
              tooltip: {
                enabled: true,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error al obtener los datos de la API", error);
      }
    };

    fetchData();
  }, []);

  if (!stockData || !fechasData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Stock de Computadoras</div>
            <div className="card-body">
              <Pie data={stockData} options={stockData.options} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Computadoras Adquiridas por Mes</div>
            <div className="card-body">
              <Bar data={fechasData} options={fechasData.options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraficaEstado;
