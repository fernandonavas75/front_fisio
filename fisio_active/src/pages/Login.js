import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axiosConfig';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/usuarios/login", {
        correo: usuario,
        contrasena: clave,
      });

      const { token, usuario: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(userData));

      if (userData.rol === 'admin') {
        navigate('/coord');
      } else if (userData.rol === 'estudiante') {
        navigate('/est');
      } else {
        setError('Rol no autorizado');
      }
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      {/* Navbar */}
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <span className="navbar-brand">FisioActive</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
              <li className="nav-item"><a className="nav-link" href="#sobre">Sobre</a></li>
              <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate('./')}>Iniciar sesión</button>
          </div>
        </div>
      </nav>

      {/* Login Form Section */}
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card shadow-lg" style={{ width: '100%', maxWidth: '350px', padding: '20px' }}>
          <div className="card-body">
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Ingresa tu correo"
                  onChange={e => setUsuario(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={e => setClave(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">Iniciar sesión</button>
              {error && <div className="text-danger text-center mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>


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

export default Login;
