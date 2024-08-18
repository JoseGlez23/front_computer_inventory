import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout({ username, handleLogout }) {
  return (
    <div className="d-flex">
      <div className="text-white vh-100 p-3" style={{ backgroundColor: "#000000" }}>
        <h4
          className="mb-4"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "28px",
            letterSpacing: "2px",
          }}
        >
          <Link to="/" className="text-white text-decoration-none">
            <img
              src="C.png" 
              alt="Inventario"
              style={{ width: "150px", height: "auto" }} 
            />
          </Link>
        </h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/graficas">
              Ver Gráficas
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center">
          <span
            className="navbar-text mx-auto text-dark"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Bienvenido {username}!!!
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-danger ml-3"
            style={{ marginRight: "20px" }}
          >
            Cerrar Sesión
          </button>
        </nav>

        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
