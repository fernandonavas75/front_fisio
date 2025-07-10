import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/Fichas.css';

const Fichas = () => {
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fichasRes, pacientesRes, usuariosRes] = await Promise.all([
          api.get('/historias-clinicas'),
          api.get('/pacientes'),
          api.get('/usuarios')
        ]);

        const estudiantesOnly = usuariosRes.data.filter(
          (u) => u.rol === 'estudiante'
        );

       

        setFichas(fichasRes.data);
        setPacientes(pacientesRes.data);
        setEstudiantes(estudiantesOnly);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditar = (ficha) => {
    setSelectedFicha(ficha);
    setForm({
      id_historia: ficha.id_historia,
      paciente: ficha.id_paciente?.toString() || '',
      estudiante: ficha.id_estudiante?.toString() || '',
      fecha_registro: ficha.fecha_evaluacion?.split('T')[0] || '',
      numero_atencion: ficha.numero_atencion || '',
      tiene_diagnostico: ficha.estado ? 'true' : 'false',
    });
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      const payload = {
        ...selectedFicha,
        id_paciente: Number(form.paciente),
        id_estudiante: Number(form.estudiante),
        fecha_evaluacion: form.fecha_registro,
        numero_atencion: Number(form.numero_atencion),
        estado: form.tiene_diagnostico === 'true',
      };

      await api.put(`/historias-clinicas/${selectedFicha.id_historia}`, payload);

      const { data } = await api.get('/historias-clinicas');
      setFichas(data);
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar ficha:', error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const obtenerNombrePaciente = (id) => {
    const paciente = pacientes.find((p) => Number(p.id_paciente) === Number(id));
    return paciente
      ? `${paciente.nombres} ${paciente.apellidos}`
      : id;
  };

  const obtenerNombreEstudiante = (id) => {
    const estudiante = estudiantes.find((e) => Number(e.id_usuario) === Number(id));
    return estudiante
      ? `${estudiante.nombres} ${estudiante.apellidos}`
      : id;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Fichas Registradas</h4>
        
        <Button variant="success" onClick={() => navigate('/agendar')}>
          + Agregar Ficha
        </Button>
      </div>

      <Table className="table-fichas">
        <thead>
          <tr>
            <th>#</th>
            <th>ID Historia</th>
            <th>Paciente</th>
            <th>Estudiante</th>
            <th>Fecha Evaluación</th>
            <th>N. Atención</th>
            <th>Diagnóstico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 && fichas.map((ficha, index) => (
            <tr key={ficha.id_historia}>
              <td>{index + 1}</td>
              <td>{ficha.id_historia}</td>
              <td>{obtenerNombrePaciente(ficha.id_paciente)}</td>
              <td>{obtenerNombreEstudiante(ficha.id_estudiante)}</td>
              <td>{ficha.fecha_evaluacion?.split('T')[0]}</td>
              <td>{ficha.numero_atencion || '-'}</td>
              <td>
                <span className={`badge-diagnostico ${ficha.estado ? 'badge-asociado' : 'badge-sin'}`}>
                  {ficha.estado ? 'Asociado' : 'Sin diagnóstico'}
                </span>
              </td>
              <td>
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(ficha)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ficha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Select
                name="paciente"
                value={form.paciente || ''}
                onChange={handleChange}
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id_paciente} value={p.id_paciente}>
                    {p.nombres} {p.apellidos}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estudiante</Form.Label>
              <Form.Select
                name="estudiante"
                value={form.estudiante || ''}
                onChange={handleChange}
              >
                <option value="">Seleccione un estudiante</option>
                {estudiantes.map((e) => (
                  <option key={e.id_usuario} value={e.id_usuario}>
                    {e.nombres} {e.apellidos}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Registro</Form.Label>
              <Form.Control
                name="fecha_registro"
                type="date"
                value={form.fecha_registro || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Atención</Form.Label>
              <Form.Control
                name="numero_atencion"
                type="number"
                value={form.numero_atencion || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Diagnóstico</Form.Label>
              <Form.Select
                name="tiene_diagnostico"
                value={form.tiene_diagnostico}
                onChange={handleChange}
              >
                <option value="true">Tiene diagnóstico</option>
                <option value="false">Sin diagnóstico</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardar}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Fichas;
