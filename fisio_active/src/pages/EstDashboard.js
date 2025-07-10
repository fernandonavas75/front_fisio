import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const CoordDashboard = () => {
  const usuario = localStorage.getItem('usuario');

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="col-md-10">
        <TopBar usuario={usuario} />
        <div className="main p-4">
          <div className="d-flex justify-content-between mb-3">
            <input className="form-control w-50" placeholder="Buscar paciente por nombre..." />
            <button className="btn btn-success ms-3">+ Nueva Historia Clínica</button>
          </div>

          <p className="text-muted">No se encontraron pacientes.</p>
        </div>
      </div>
    </div>
  );
};

export default CoordDashboard;
