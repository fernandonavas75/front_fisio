import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const DetallePaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        // Obtener datos básicos del paciente
        const { data: pacienteData } = await api.get(`/pacientes/${id}`);

        // Obtener historias clínicas del paciente
        const { data: historias } = await api.get(`/historias-clinicas/paciente/${id}`);

        // Si hay historias clínicas, tomamos la primera para traer antecedentes y seguimientos
        let antecedentes = {};
        let seguimientos = [];

        if (historias.length > 0) {
          const historiaId = historias[0].id_historia;

          // Antecedentes
          try {
            const { data } = await api.get(`/antecedentes/${historiaId}`);
            antecedentes = data;
          } catch (antecedentesError) {
            console.log('No se encontraron antecedentes:', antecedentesError);
          }

          // Seguimientos
          try {
            const { data } = await api.get(`/seguimientos?historiaId=${historiaId}`);
            seguimientos = data;
          } catch (seguimientoError) {
            console.log('No se encontraron seguimientos:', seguimientoError);
          }
        }

        setPaciente({
          ...pacienteData,
          historias,
          antecedentes,
          seguimientos
        });
      } catch (err) {
        console.error(err);
        setError('Error al cargar la información del paciente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando datos del paciente...</p>
      </div>
    );
  }

  if (error || !paciente) {
    return (
      <div className="container py-4">
        <Alert variant="danger">{error || 'Paciente no encontrado.'}</Alert>
        <Button variant="primary" onClick={() => navigate('/pacientes')}>
          Volver al listado
        </Button>
      </div>
    );
  }

  const { historias, antecedentes, seguimientos } = paciente;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Resumen del Paciente</h3>
        <Button variant="outline-primary" onClick={() => navigate('/pacientes')}>
          <i className="bi bi-arrow-left"></i> Volver al listado
        </Button>
      </div>

      {/* Datos del Paciente */}
      <Card className="mb-4">
        <Card.Header><strong>Datos del Paciente</strong></Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}><b>Nombres:</b> {paciente.nombres}</Col>
            <Col md={4}><b>Apellidos:</b> {paciente.apellidos}</Col>
            <Col md={4}><b>Género:</b> {paciente.genero}</Col>
            <Col md={4}><b>Fecha nacimiento:</b> {paciente.fecha_nacimiento}</Col>
            <Col md={4}><b>Edad:</b> {calcularEdad(paciente.fecha_nacimiento)}</Col>
            <Col md={4}><b>Peso:</b> {historias?.[0]?.peso || '-'} kg</Col>
            <Col md={4}><b>Estatura:</b> {historias?.[0]?.estatura || '-'} cm</Col>
            <Col md={4}><b>Escuela:</b> {historias?.[0]?.escuela || '-'}</Col>
            <Col md={4}><b>Grado:</b> {historias?.[0]?.grado || '-'}</Col>
            <Col md={4}><b>Tutor:</b> {historias?.[0]?.nombres_tutor || '-'}</Col>
            <Col md={4}><b>Teléfono tutor:</b> {historias?.[0]?.telefono_tutor || '-'}</Col>
            <Col md={4}><b>Correo tutor:</b> {historias?.[0]?.correo_tutor || '-'}</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Historia Clínica y Atención */}
      <Card className="mb-4">
        <Card.Header><strong>Historia Clínica y Atención</strong></Card.Header>
        <Card.Body>
          {historias && historias.length > 0 ? (
            <>
              <p><b>Estudiantes que lo atendieron:</b> {historias.map(h => h.id_estudiante).join(', ')}</p>
              <p><b>Total de fichas recolectadas:</b> {historias.length}</p>
              <p><b>Última fecha de evaluación:</b> {historias[0].fecha_evaluacion}</p>
              <p><b>Último diagnóstico preliminar:</b> {historias[0].diagnostico_preliminar || '-'}</p>
              <p><b>Plan de intervención:</b> {historias[0].plan_intervencion || '-'}</p>
            </>
          ) : (
            <p>No se encontraron historias clínicas para este paciente.</p>
          )}
        </Card.Body>
      </Card>

      {/* Antecedentes */}
      <Card className="mb-4">
        <Card.Header><strong>Antecedentes</strong></Card.Header>
        <Card.Body>
          {antecedentes && Object.keys(antecedentes).length > 0 ? (
            <Row>
              {Object.entries(antecedentes).map(([key, value]) => (
                <Col md={6} className="mb-2" key={key}>
                  <b>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</b>{' '}
                  {typeof value === 'boolean'
                    ? value
                      ? 'Sí'
                      : 'No'
                    : value || '-'}
                </Col>
              ))}
            </Row>
          ) : (
            <p>No se encontraron antecedentes.</p>
          )}
        </Card.Body>
      </Card>

      {/* Últimos seguimientos */}
      <Card className="mb-4">
        <Card.Header><strong>Últimos Seguimientos</strong></Card.Header>
        <Card.Body>
          {seguimientos && seguimientos.length > 0 ? (
            seguimientos.map((s, idx) => (
              <div key={idx} className="mb-3">
                <p><b>Fecha:</b> {s.fecha}</p>
                <p><b>Intervenciones:</b> {s.intervenciones}</p>
                <p><b>Observaciones:</b> {s.observaciones}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No se encontraron seguimientos.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

// ✅ Función auxiliar para calcular edad
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return '-';
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  return edad;
}

export default DetallePaciente;
