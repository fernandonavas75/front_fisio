import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const SECTORES = ['Centro Norte', 'Sur', 'Norte', 'Valles', 'Occidental'];

const AgregarEstudiantes = () => {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [ultimoID, setUltimoID] = useState(1000);
  const [errorCantidad, setErrorCantidad] = useState('');
  const [sectorGlobal, setSectorGlobal] = useState('');
  const [mostrarContrasenas, setMostrarContrasenas] = useState(true);
  const [alerta, setAlerta] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const { data } = await api.get('/pacientes');
        setPacientes(data);
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
      } finally {
        setLoadingPacientes(false);
      }
    };

    fetchPacientes();
  }, []);

  const generarContrasena = () => {
    return Math.random().toString(36).slice(-8);
  };

  const validarCantidad = (valor) => {
    if (!/^\d+$/.test(valor)) return 'Solo se permiten números enteros.';
    const num = parseInt(valor, 10);
    if (num < 1 || num > 20) return 'Debe ingresar entre 1 y 20 estudiantes.';
    return '';
  };

  const handleCantidadChange = (e) => {
    const val = e.target.value;
    setCantidad(val);
    setErrorCantidad(validarCantidad(val));
  };

  const generarListaEstudiantes = () => {
    const error = validarCantidad(cantidad);
    setErrorCantidad(error);
    if (error) return;
    const hoy = new Date().toISOString().split('T')[0];
    const n = parseInt(cantidad);

    const lista = Array.from({ length: n }, () => ({
      nombres: '',
      apellidos: '',
      cedula: '',
      correo: '',
      contrasena: generarContrasena(),
      conexion: hoy,
      rol: 'estudiante',
      sector: '',
      id_paciente: ''
    }));
    setEstudiantes(lista);
  };

  const handleChange = (index, campo, valor) => {
    const copia = [...estudiantes];
    copia[index][campo] = valor;
    setEstudiantes(copia);
  };

  const asignarSectorGlobal = (sector) => {
    const actualizados = estudiantes.map(e => ({ ...e, sector }));
    setEstudiantes(actualizados);
    setSectorGlobal(sector);
  };

  const asignarPacientesAleatorios = () => {
    if (estudiantes.length > pacientes.length) {
      alert('No hay suficientes pacientes únicos para asignar.');
      return;
    }
    const disponibles = [...pacientes].sort(() => 0.5 - Math.random());
    const actualizados = estudiantes.map((e, i) => ({
      ...e,
      id_paciente: disponibles[i]?.id_paciente || ''
    }));
    setEstudiantes(actualizados);
  };

  const guardarTodos = async () => {
    try {
      for (const est of estudiantes) {
        const payload = {
          nombres: est.nombres,
          apellidos: est.apellidos,
          cedula: est.cedula,
          correo: est.correo,
          contrasena: est.contrasena,
          rol: est.rol,
          conexion: est.conexion
        };

        const { data: usuarioCreado } = await api.post('/usuarios', payload);

        if (est.id_paciente) {
          await api.post('/paciente-estudiante', {
            id_paciente: Number(est.id_paciente),
            id_estudiante: usuarioCreado.id_usuario
          });
        }
      }
      setAlerta({ tipo: 'success', mensaje: 'Estudiantes creados exitosamente.' });
      setTimeout(() => navigate('/estudiantes'), 1500);
    } catch (error) {
      console.error(error);
      setAlerta({ tipo: 'danger', mensaje: 'Error al guardar estudiantes.' });
    }
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/estudiantes')}>
        ← Volver a Estudiantes
      </Button>

      <h4>Registrar Múltiples Estudiantes</h4>

      {alerta && (
        <Alert variant={alerta.tipo} onClose={() => setAlerta(null)} dismissible>
          {alerta.mensaje}
        </Alert>
      )}

      <Form.Group className="mb-3 w-25">
        <Form.Label>Cantidad de estudiantes</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese un número entre 1 y 20"
          value={cantidad}
          onChange={handleCantidadChange}
          isInvalid={!!errorCantidad}
        />
        <Form.Control.Feedback type="invalid">{errorCantidad}</Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        className="mb-3 me-2"
        onClick={generarListaEstudiantes}
        disabled={!!errorCantidad || cantidad === ''}
      >
        Generar lista
      </Button>

      {estudiantes.length > 0 && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <Form.Select
            className="w-auto"
            value={sectorGlobal}
            onChange={(e) => asignarSectorGlobal(e.target.value)}
          >
            <option value="">Asignar sector a todos</option>
            {SECTORES.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </Form.Select>

          <Button
            variant="warning"
            onClick={asignarPacientesAleatorios}
            disabled={loadingPacientes}
          >
            {loadingPacientes ? (
              <>
                <Spinner animation="border" size="sm" /> Cargando...
              </>
            ) : (
              "Asignar pacientes aleatorios"
            )}
          </Button>

          <Button
            variant="outline-dark"
            onClick={() => setMostrarContrasenas(prev => !prev)}
          >
            {mostrarContrasenas ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
          </Button>
        </div>
      )}

      {estudiantes.length > 0 && (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Cédula</th>
                <th>Correo</th>
                <th>Sector</th>
                <th>Contraseña</th>
                <th>Paciente</th>
              </tr>
            </thead>

            <tbody>
              {estudiantes.map((est, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <Form.Control
                      value={est.nombres}
                      onChange={(e) => handleChange(i, 'nombres', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      value={est.apellidos}
                      onChange={(e) => handleChange(i, 'apellidos', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      value={est.cedula}
                      onChange={(e) => handleChange(i, 'cedula', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      value={est.correo}
                      onChange={(e) => handleChange(i, 'correo', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={est.sector}
                      onChange={(e) => handleChange(i, 'sector', e.target.value)}
                    >
                      <option value="">—</option>
                      {SECTORES.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type={mostrarContrasenas ? 'text' : 'password'}
                      value={est.contrasena}
                      onChange={(e) => handleChange(i, 'contrasena', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={est.id_paciente || ''}
                      onChange={(e) => handleChange(i, 'id_paciente', e.target.value)}
                    >
                      <option value="">—</option>
                      {pacientes.map((p) => (
                        <option key={p.id_paciente} value={p.id_paciente}>
                          {p.nombres} {p.apellidos}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={() => navigate('/estudiantes')}>Cancelar</Button>
            <Button variant="success" onClick={guardarTodos}>Guardar estudiantes</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgregarEstudiantes;
