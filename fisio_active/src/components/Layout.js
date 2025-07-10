import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const routeTitles = {
  '/coord': 'Inicio',
  '/est': 'Inicio Estudiante',
  '/pacientes': 'Pacientes',
  '/pacientes/:id': 'Detalle Paciente',
  '/fichas': 'Fichas',
  '/estudiantes': 'Estudiantes',
  '/informe': 'Informe',
  '/agendar': 'Agendar Ficha',
  '/agregar-estudiantes': 'Agregar Estudiantes'
  // Puedes seguir agregando aquí tus rutas
};

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Resolver coincidencias para rutas dinámicas como /pacientes/123
  const matchPath = Object.keys(routeTitles).find(route => {
    if (route.includes(':')) {
      const base = route.split('/:')[0];
      return path.startsWith(base);
    }
    return route === path;
  });

  const titulo = routeTitles[matchPath] || 'Panel';

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="col-md-10">
        <TopBar titulo={titulo} />
        <div className="px-4 pt-0 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
