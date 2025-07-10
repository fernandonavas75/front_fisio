import { useEffect, useState } from 'react';
import '../styles/AdminDashboard.css';

const CoordDashboard = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(user);
  }, []);

  return (
    <main className="content px-4">
      <h3 className="mb-1 fw-semibold">Bienvenido, {usuario?.nombre_completo || 'Invitado'}</h3>
      <p className="text-muted mb-4">Utilice el menú para gestionar la información del sistema.</p>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div
            className="card text-bg-success"
            onClick={() => (window.location.href = '/estudiantes')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <i className="bi bi-mortarboard-fill display-5"></i>
              <h5 className="card-title">Estudiantes</h5>
              <h2 style={{ fontWeight: 700 }}>5</h2>
              <span className="btn btn-light btn-sm mt-1">Ver todos</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-bg-primary"
            onClick={() => (window.location.href = '/pacientes')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <i className="bi bi-people-fill display-5"></i>
              <h5 className="card-title">Pacientes</h5>
              <h2 style={{ fontWeight: 700 }}>20</h2>
              <span className="btn btn-light btn-sm mt-1">Ver todos</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-bg-warning"
            onClick={() => (window.location.href = '/fichas')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <i className="bi bi-journal-text display-5"></i>
              <h5 className="card-title">Fichas</h5>
              <h2 style={{ fontWeight: 700 }}>12</h2>
              <span className="btn btn-light btn-sm mt-1">Ver todas</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-bg-danger"
            onClick={() => (window.location.href = '/asignar')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <i className="bi bi-exclamation-circle display-5"></i>
              <h5 className="card-title">Reportes</h5>
              <h2 style={{ fontWeight: 700 }}>3</h2>
              <span className="btn btn-light btn-sm mt-1">Asignar</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <img
          src="https://img.icons8.com/fluency/96/000000/hospital-room.png"
          alt="Clínica"
          style={{ width: 70, opacity: 0.8 }}
        />
        <p className="mt-3" style={{ fontSize: '1.1rem', color: '#43567a' }}>
          Sistema de gestión clínica escolar
          <br />
          <span style={{ fontSize: '.98rem' }}>
            Seleccione una opción en el menú para empezar
          </span>
        </p>
      </div>
    </main>
  );
};

export default CoordDashboard;