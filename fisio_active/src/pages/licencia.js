// src/pages/Licencia.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Licencia() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <span className="navbar-brand">FisioActive</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/')}>Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/')}>Sobre</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/')}>Contacto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" onClick={() => navigate('/licencia')}>Licencia</a>
              </li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Iniciar sesión</button>
          </div>
        </div>
      </nav>

      {/* Contenido de la licencia */}
      <div className="container py-5">
        <h1 className="mb-4">Términos de Uso y Licencia Legal</h1>
        <p>
          Este proyecto, <strong>FisioActive</strong>, ha sido desarrollado de forma independiente por <strong>Fernando José Navas Molina</strong>
          como parte de un proceso académico. Toda su estructura, lógica, diseño, API y funcionalidades se encuentran protegidas por un
          <strong> contrato de licencia de uso exclusivo</strong>.
        </p>
        <p>
          El uso no autorizado, distribución, reproducción o despliegue de este sistema sin el consentimiento expreso y firmado del autor
          está sujeto a sanciones legales y económicas conforme a la legislación vigente en el estado de <strong>Louisiana, EE.UU.</strong>
        </p>
        <p>
          Esta aplicación hace uso de herramientas como: <strong>OpenAI API</strong>, <strong>Render</strong>, <strong>Postman</strong>, <strong>GitHub</strong>, y fue desarrollada con <strong>recursos propios</strong>.
        </p>
        <p>
          <a 
            href="/Contrato_Licencia_Proyecto_Fisio_Navas.pdf" 
            download 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-primary mt-3"
          >
            📄 Descargar contrato de licencia (.PDF)
          </a>
        </p>

        {/* Créditos del proyecto */}
        <hr className="my-5" />
        <h2 className="mb-3">Créditos del Proyecto</h2>
        <p>
          El sistema <strong>FisioActive</strong> fue desarrollado principalmente por <strong>Fernando José Navas Molina</strong>, quien lideró:
        </p>
        <ul>
          <li>Diseño y reestructuración completa de la base de datos.</li>
          <li>Desarrollo y refactorización del backend (API REST con integración IA).</li>
          <li>Implementación del frontend y diseño de la interfaz de usuario.</li>
          <li>Integración y despliegue en plataformas como Render, GitHub y OpenAI.</li>
        </ul>
        <p>
          También se reconoce la colaboración puntual de:
        </p>
        <ul>
          <li><strong>Luis Salazar</strong>, en algunos aspectos técnicos, aunque el código fue refactorizado por el autor principal.</li>
          <li><strong>Liseth Murillo</strong> y <strong>David Soto</strong>, por su apoyo en tareas no técnicas y aspectos académicos.</li>
        </ul>
        <p>
          Este proyecto refleja más de tres meses de trabajo intensivo con más de 100 commits registrados, demostrando dedicación y responsabilidad técnica.
        </p>
      </div>
    </div>
  );
}
