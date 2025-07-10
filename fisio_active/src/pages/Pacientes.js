import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Pacientes.css';

const Pacientes = () => {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  // ✅ Cargar pacientes desde el backend
  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const res = await api.get('/pacientes');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  const handleEditar = (index) => {
    setIsEdit(true);
    setSelectedIndex(index);
    setForm({ ...pacientes[index] });
    setShowModal(true);
  };

  const handleNuevo = () => {
    setIsEdit(false);
    setForm({
      nombres: '',
      apellidos: '',
      genero: '',
      fecha_nacimiento: ''
    });
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      if (isEdit) {
        // ✅ Actualizar paciente
        await api.put(`/pacientes/${form.id_paciente}`, form);
      } else {
        // ✅ Crear nuevo paciente
        await api.post('/pacientes', form);
      }

      fetchPacientes();
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar paciente:', error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        await api.delete(`/pacientes/${id}`);
        fetchPacientes();
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const verDetalle = (paciente) => {
    navigate(`/pacientes/${paciente.id_paciente}`, { state: paciente });
  };

  return (
    <div className="container py-4">
      <div className="mb-3 d-flex justify-content-end">
        <Button className="btn-success" onClick={handleNuevo}>
          <i className="bi bi-person-plus"></i> Nuevo paciente
        </Button>
      </div>

      <div className="table-responsive">
        <Table className="table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Género</th>
              <th>Fecha de nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, index) => (
              <tr key={p.id_paciente}>
                <td>{index + 1}</td>
                <td>PAC{String(p.id_paciente).padStart(3, '0')}</td>
                <td>{p.nombres}</td>
                <td>{p.apellidos}</td>
                <td>{p.genero}</td>
                <td>{p.fecha_nacimiento}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-1"
                    title="Ver"
                    onClick={() => verDetalle(p)}
                  >
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-1"
                    title="Editar"
                    onClick={() => handleEditar(index)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    title="Eliminar"
                    onClick={() => handleEliminar(p.id_paciente)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Editar Paciente' : 'Nuevo Paciente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              {[ 
                { name: 'nombres', label: 'Nombres' },
                { name: 'apellidos', label: 'Apellidos' },
                {
                  name: 'genero',
                  label: 'Género',
                  type: 'select',
                  options: ['Femenino', 'Masculino', 'Otro']
                },
                {
                  name: 'fecha_nacimiento',
                  label: 'Fecha de nacimiento',
                  type: 'date'
                }
              ].map(({ name, label, type = 'text', options }) => (
                <div className="col-md-6 mb-3" key={name}>
                  <Form.Label>{label}</Form.Label>
                  {type === 'select' ? (
                    <Form.Select
                      name={name}
                      value={form[name] || ''}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Form.Control
                      name={name}
                      type={type}
                      value={form[name] || ''}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleGuardar}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pacientes;
