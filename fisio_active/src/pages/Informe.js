import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import '../styles/Informe.css'; // Estilo específico para Informe

// Registrar los elementos necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Informe = () => {
  const navigate = useNavigate();
  const [informes, setInformes] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [selectedChart, setSelectedChart] = useState("sector"); // Estado para seleccionar el gráfico

  useEffect(() => {
    const baseInformes = [
      {
        id_informe: 1,
        titulo: 'Informe Individual - Fisioterapia',
        tipo_informe: 'individual',
        id_usuario: 1,
        fecha_creacion: '2025-06-04T12:00:00',
        enlace_pdf: 'https://example.com/informe1.pdf',
      },
      {
        id_informe: 2,
        titulo: 'Informe General de Fisioterapia',
        tipo_informe: 'general',
        id_usuario: 2,
        fecha_creacion: '2025-06-05T12:00:00',
        enlace_pdf: 'https://example.com/informe2.pdf',
      },
    ];
    const basePacientes = [
      {
        id_paciente: 1,
        nombre: 'Andrea López',
        sector: 'Sector A',
      },
      {
        id_paciente: 2,
        nombre: 'Carlos García',
        sector: 'Sector B',
      },
      {
        id_paciente: 3,
        nombre: 'Valeria Mendoza',
        sector: 'Sector A',
      },
    ];

    const guardadosInformes = JSON.parse(localStorage.getItem('informes')) || [];
    const guardadosPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    setInformes([...baseInformes, ...guardadosInformes]);
    setPacientes([...basePacientes, ...guardadosPacientes]);
  }, []);

  const actualizarLocalStorage = (nuevos) => {
    localStorage.setItem('informes', JSON.stringify(nuevos));
  };

  const handleEditar = (index) => {
    setSelectedIndex(index);
    setForm({ ...informes[index] });
    setConfirmDeleteIndex(null);
    setShowModal(true);
  };

  const handleGuardar = () => {
    const nuevos = [...informes];
    nuevos[selectedIndex] = form;
    setInformes(nuevos);
    actualizarLocalStorage(nuevos);
    setShowModal(false);
    setConfirmDeleteIndex(null);
  };

  const confirmarEliminar = (index) => {
    const nuevos = [...informes];
    nuevos.splice(index, 1);
    setInformes(nuevos);
    actualizarLocalStorage(nuevos);
    setShowModal(false);
    setConfirmDeleteIndex(null);
  };

  const cancelarEliminar = () => {
    setConfirmDeleteIndex(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Cálculo de estadísticas
  const totalPacientes = pacientes.length;
  const sectores = pacientes.reduce((acc, paciente) => {
    acc[paciente.sector] = (acc[paciente.sector] || 0) + 1;
    return acc;
  }, {});
  const totalInformes = informes.length;
  const informesPorTipo = informes.reduce((acc, informe) => {
    acc[informe.tipo_informe] = (acc[informe.tipo_informe] || 0) + 1;
    return acc;
  }, {});

  // Datos para el gráfico según la selección
  const getChartData = () => {
    switch (selectedChart) {
      case 'sector':
        return {
          labels: Object.keys(sectores),
          datasets: [
            {
              label: 'Pacientes por Sector',
              data: Object.values(sectores),
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56'],
              borderColor: ['#36A2EB', '#FF6384', '#FFCD56'],
              borderWidth: 1,
            },
          ],
        };
      case 'tipo_informe':
        return {
          labels: Object.keys(informesPorTipo),
          datasets: [
            {
              label: 'Informes por Tipo',
              data: Object.values(informesPorTipo),
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56'],
              borderColor: ['#36A2EB', '#FF6384', '#FFCD56'],
              borderWidth: 1,
            },
          ],
        };
      default:
        return {};
    }
  };


  return (
    <div>
        <div className="resumen-titulo mb-4">
            <h2>Informes</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="success" onClick={() => navigate('/agregar-informe')}>
          Agregar Informe
        </Button>
      </div>
      {/* Tabla de Informes */}
      <Table className="table-informes">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Tipo de Informe</th>
            <th>Fecha de Creación</th>
            <th>Enlace PDF</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {informes.map((informe, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{informe.titulo}</td>
              <td>{informe.tipo_informe}</td>
              <td>{new Date(informe.fecha_creacion).toLocaleDateString()}</td>
              <td>
                <a href={informe.enlace_pdf} target="_blank" rel="noopener noreferrer">
                  Ver PDF
                </a>
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditar(index)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="resumen-titulo mb-4">
            <h2>Resumen</h2>
      </div>

      {/* Botones para seleccionar el gráfico */}
      <div className="mb-4">
        <Button
          variant={selectedChart === 'sector' ? 'primary' : 'secondary'}
          onClick={() => setSelectedChart('sector')}
        >
          Pacientes por Sector
        </Button>
        <Button
          variant={selectedChart === 'tipo_informe' ? 'primary' : 'secondary'}
          onClick={() => setSelectedChart('tipo_informe')}
          className="ml-3"
        >
          Informes por Tipo
        </Button>
      </div>

      

      {/* Gráfico basado en la selección */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Gráfico de {selectedChart === 'sector' ? 'Pacientes por Sector' : 'Informes por Tipo'}</Card.Title>
              <Bar data={getChartData()} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Cuadros Estadísticos */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total de Informes</Card.Title>
              <Card.Text>{totalInformes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total de Pacientes</Card.Title>
              <Card.Text>{totalPacientes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Pacientes por Sector</Card.Title>
              <ul>
                {Object.entries(sectores).map(([sector, count]) => (
                  <li key={sector}>
                    {sector}: {count}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      

      {/* Modal edición */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setConfirmDeleteIndex(null); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Informe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control name="titulo" value={form.titulo || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Tipo de Informe</Form.Label>
              <Form.Control name="tipo_informe" value={form.tipo_informe || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Enlace PDF</Form.Label>
              <Form.Control name="enlace_pdf" value={form.enlace_pdf || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Fecha de Creación</Form.Label>
              <Form.Control type="datetime-local" name="fecha_creacion" value={form.fecha_creacion || ''} onChange={handleChange} />
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
              Eliminar informe
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardar}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Informe;