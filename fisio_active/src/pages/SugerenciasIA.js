// src/pages/SugerenciasIA.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // si tu sidebar está en una ruta distinta, ajusta el import
import '../styles/Fichas.css'; // mismo estilo que otras páginas

const SugerenciasIA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sugerencias = location.state?.sugerencias || "No se han recibido sugerencias.";

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className="mb-4">Sugerencias de tratamiento</h2>
        {sugerencias ? (
          <pre className="bg-light p-3 rounded border" style={{ whiteSpace: 'pre-wrap' }}>
            {sugerencias}
          </pre>
        ) : (
          <p>No se han recibido sugerencias.</p>
        )}
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default SugerenciasIA;
