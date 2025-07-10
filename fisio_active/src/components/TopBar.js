import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = ({ titulo }) => {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUsuario(userObj.nombre_completo);
        setRol(userObj.rol);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    }
  }, []);

  const rolFormateado = rol === 'admin'
    ? 'Administrador'
    : rol === 'estudiante'
    ? 'Estudiante'
    : 'Usuario';

  const dashboardPath = rol === 'admin' ? '/coord' : '/est';

  // Rutas "principales" que deben volver al dashboard
  const rutasBase = ['/pacientes', '/fichas', '/informe', '/estudiantes'];

  const isDashboard = location.pathname === dashboardPath;
  const isRutaBase = rutasBase.includes(location.pathname);

  const handleVolver = () => {
    if (isRutaBase) {
      navigate(dashboardPath, { replace: true }); // no guarda en historial
    } else {
      navigate(-1); // retrocede normalmente
    }
  };

  return (
    <header className="header-bar">
      <div>
        <h3>{titulo || 'Panel'}</h3>
        <div className="admin-info">
          {rolFormateado}: {usuario || 'Invitado'}
        </div>
      </div>

      <div className="d-flex gap-2">
        {!isDashboard && (
          <button className="btn btn-outline-light" onClick={handleVolver}>
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        )}
      </div>
    </header>
  );
};

export default TopBar;
