import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  const cards = [
    { src: "/img/foto1.jpg", title: "Historia clínica", desc: "Datos personales, antecedentes médicos y del tutor." },
    { src: "/img/foto2.jpg", title: "Evaluación funcional", desc: "Incluye pruebas específicas, análisis postural y movilidad." },
    { src: "/img/foto3.jpg", title: "Seguimiento terapéutico", desc: "Registros periódicos del avance del paciente." }
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <span className="navbar-brand">FisioActive</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/')}>Inicio</a> {/* Usamos navigate para la ruta absoluta */}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#sobre">Sobre</a> {/* Ancla interna */}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">Contacto</a> {/* Ancla interna */}
              </li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Iniciar sesión</button> {/* Redirige al login */}
          </div>
        </div>
      </nav>

      {/* Sección Bienvenida */}
      <header id="inicio" className="hero-section text-center py-5">
        <div className="container">
          <h1 className="mb-4">Bienvenido a FisioActive</h1>
          <p className="mb-4">
            Plataforma académica de gestión de historias clínicas fisioterapéuticas,
            desarrollada por estudiantes de la PUCE.
          </p>

          {/* Mostrar imágenes en fila */}
          <div className="row justify-content-center">
            {cards.map((card, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card">
                  <img 
                    src={card.src} 
                    alt={card.title} 
                    className="card-img-top img-fluid" 
                    style={{ height: '200px', objectFit: 'cover' }} // Ajuste de tamaño
                  />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Sección sobre FisioActive */}
      <section id="sobre" className="container mt-5">
        <h2>¿Qué es FisioActive?</h2>
        <img src="/img/foto4.jpg" alt="FisioActive" className="img-custom mb-4" />
        <p>
            FisioActive es una aplicación web desarrollada por estudiantes de la carrera de Fisioterapia de la PUCE.
            Su propósito es optimizar el registro, seguimiento y análisis de las historias clínicas generadas durante la atención a pacientes.
        </p>
        <p>
            Esta herramienta fortalece la formación académica y contribuye a mejorar la atención fisioterapéutica brindada
            por los futuros profesionales de salud.
        </p>
      </section>

      {/* Sección de contacto */}
      <section id="contacto" className="container mt-5 mb-5">
        <h2>Contacto</h2>
        <p>Correo institucional: fisioterapia@puce.edu.ec</p>
        <p>Proyecto académico - Facultad de Ciencias de la Salud, PUCE</p>
      </section>

      {/* Footer */}
      <footer className="bg-clear text-light text-center py-4 mt-5">
        <div className="container">
          <p className="mb-1">&copy; {new Date().getFullYear()} FisioActive - PUCE</p>
          <p className="mb-0">Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
