import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/Estudiantes.css';

const Estudiantes = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await api.get('/usuarios');
        const estudiantesFiltrados = res.data.filter(u => u.rol === 'estudiante');
        setEstudiantes(estudiantesFiltrados);
      } catch (error) {
        console.error('Error al cargar estudiantes:', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const handleEditar = (index) => {
    setSelectedIndex(index);
    setForm({ ...estudiantes[index] });
    setConfirmDeleteIndex(null);
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      const payload = {
        cedula: form.cedula,
        nombres: form.nombres,
        apellidos: form.apellidos,
        correo: form.correo,
        rol: form.rol,
        conexion: form.conexion,
      };

      // ✅ Solo incluir contraseña si el usuario la cambió
      if (newPassword) {
        payload.contrasena = newPassword;
      }

      await api.put(`/usuarios/${form.id_usuario}`, payload);

      const res = await api.get('/usuarios');
      const estudiantesFiltrados = res.data.filter(u => u.rol === 'estudiante');
      setEstudiantes(estudiantesFiltrados);

      setShowModal(false);
      setConfirmDeleteIndex(null);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error al guardar estudiante:', error);
    }
  };

const confirmarEliminar = async (index) => {
  try {
    const id = estudiantes[index].id_usuario;

    // ✅ 1. Consultar todas las relaciones Paciente-Estudiante
    const { data: relaciones } = await api.get('/paciente-estudiante');

    // ✅ 2. Filtrar las relaciones del estudiante que vamos a eliminar
    const relacionesDelEstudiante = relaciones.filter(
      (rel) => rel.id_estudiante === id
    );

    // ✅ 3. Eliminar cada relación encontrada
    for (const rel of relacionesDelEstudiante) {
      await api.delete(`/paciente-estudiante/${rel.id}`);
    }

    // ✅ 4. Eliminar finalmente el usuario
    await api.delete(`/usuarios/${id}`);

    // ✅ 5. Refrescar la lista de estudiantes
    const res = await api.get('/usuarios');
    const estudiantesFiltrados = res.data.filter(u => u.rol === 'estudiante');
    setEstudiantes(estudiantesFiltrados);

    setShowModal(false);
    setConfirmDeleteIndex(null);
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
  }
};
  

  const cancelarEliminar = () => {
    setConfirmDeleteIndex(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="success" onClick={() => navigate('/agregar-estudiantes')}>
          Agregar Estudiantes
        </Button>
      </div>

      <Table className="table-estudiantes">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cédula</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Última Conexión (fecha)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{est.nombres}</td>
              <td>{est.apellidos}</td>
              <td>{est.cedula}</td>
              <td>{est.correo}</td>
              <td>{est.rol}</td>
              <td>{est.conexion}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditar(index)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => { setShowModal(false); setConfirmDeleteIndex(null); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Cédula</Form.Label>
              <Form.Control name="cedula" value={form.cedula || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Nombres</Form.Label>
              <Form.Control name="nombres" value={form.nombres || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Apellidos</Form.Label>
              <Form.Control name="apellidos" value={form.apellidos || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Correo</Form.Label>
              <Form.Control name="correo" value={form.correo || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value=""
                  placeholder="••••••••"
                  disabled
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </Button>
                <Button variant="outline-primary" onClick={() => setShowChangePassModal(true)}>
                  Cambiar
                </Button>
              </div>

              <Form.Label className="mt-3">Rol</Form.Label>
              <Form.Control name="rol" value={form.rol || ''} onChange={handleChange} disabled />

              <Form.Label className="mt-3">Última Conexión</Form.Label>
              <Form.Control name="conexion" value={form.conexion || ''} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {confirmDeleteIndex === selectedIndex ? (
            <>
              <Button variant="danger" onClick={() => confirmarEliminar(selectedIndex)}>Confirmar</Button>
              <Button variant="secondary" onClick={cancelarEliminar}>Cancelar</Button>
            </>
          ) : (
            <Button variant="outline-danger" onClick={() => setConfirmDeleteIndex(selectedIndex)}>
              Eliminar estudiante
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardar}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showChangePassModal}
        onHide={() => setShowChangePassModal(false)}
        centered
        dialogClassName="slide-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nueva contraseña</Form.Label>
            <div className="input-group mb-3">
              <Form.Control
                type={showNewPass ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowNewPass(!showNewPass)}>
                <i className={`bi ${showNewPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>

            <Form.Label>Confirmar contraseña</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showConfirmPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                <i className={`bi ${showConfirmPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePassModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (newPassword === confirmPassword && newPassword !== '') {
                setNewPassword(newPassword);
                setForm({ ...form }); // No se guarda en form.contrasena directamente
                setShowChangePassModal(false);
                setNewPassword('');
                setConfirmPassword('');
              } else {
                alert('Las contraseñas no coinciden o están vacías');
              }
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Estudiantes;
