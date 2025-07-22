import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

/**
 * Form antecedentes familiares
 * pasi dedducado a los antecedentes familiares
 * 
 * props
 * - Values: Objeto global con todos los campos (JSON0)
 * - on change: (patch => void para actualizar el json en el pafre)
 * - onPrev : () => void paso anterior
 * - OnNext: () = voif paso en la Siguiente
 * 
 *Creo que seria todo por el moemtno sin embargo lo que se planea hacer en este 
 paso es recopilar todos los datos que se obtiene de la base de datos 
 para que los campos como:
 * id_paciente
 * id_estudiante
 * peso 
 * estatura
 * grado 
 * escuela 
 * se autocompreten para evitar errores en la base de datos y al momento de envuar el JSON
 */

export default function FormDatosPaciente({ values, onChange, onPrev, onNext }) {
    const [paciente, setPaciente] = useState([]); // Datos del paciente
    const [setLoadingPacientes] = useState(true); // Cargando datos del paciente

    const handle = (e) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    //En teoria es para obtener los datos del paciente desde el backend
    const handleSelectPaciente = async (e) => {
        const selectedId = e.target.value;
        onChange({ id_paciente: selectedId }); //Guardar el ID del paciente seleccionado
        if (!selectedId) return;
        try {
            const { data: pacienteData } = await api.get(`/pacientes/${selectedId}`);
            const { data: historias } = await api.get(`/historias-clinicas/paciente/${selectedId}`);
            const historia = historias.length > 0 ? historias[0] : null; // Es para verificar si hay historias clínicas
            //La otra opcion del codigo de arriba
            // const historia = historias?.[0] || {};
            const fechaNacimiento = pacienteData.fecha_nacimiento || "";
            const edad = calcularEdad(fechaNacimiento);
            onChange({
                nombres: pacienteData.nombres,
                apellidos: pacienteData.apellidos,
                genero: pacienteData.genero,
                fechaNacimiento,
                edad,
                escuela: historia.escuela || '',
                grado: historia.grado || '',
                estatura: historia.estatura || '',
                peso: historia.peso || '',
                nombresTutor: historia.nombres_tutor || '',
                telefono_tutor: historia.telefono_tutor || '',
                correo_tutor: historia.correo_tutor || '',
            });
        } catch (error) {
            console.error("Error al obtener los datos del paciente:", error);
        };
        
    };
    useEffect(() => {
            const fetchPacientes = async () => {
                try {
                    const { data } = await api.get('/pacientes');
                    setPaciente(data);
                } catch (error) {
                    console.error("Error al cargar los pacientes:", error);
                } finally {
                    setLoadingPacientes(false);
                }
            };
            fetchPacientes();
        }, []);
    return (
        <div>
            <h5 className='mb-4'> Datos del Paciente</h5>
            {/*ComboBox para selecionar paciente*/}
            <div className='mb-3'>
                <select className='form-select' onChange={handleSelectPaciente} value={values.id_paciente || ""}>
                    <option value="">Seleccione un Paciente...</option>
                    {paciente.map((p) => (
                        <option key={p.id_paciente} value={p.id_paciente}>
                            {p.nombres} {p.apellidos}
                        </option>
                    ))}
                </select>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input type="text" className="form-control mb-2" name="nombres" placeholder='Nombres' value={values.nombres || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="edad" placeholder='Edad' value={values.edad || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="estatura" placeholder='Estatura (cm)' value={values.estatura || ""} onChange={handle} />
                    <input type="date" className="form-control mb-2" name="fechaNacimiento" value={values.fechaNacimiento || ""} onChange={handle} />
                    <input type="date" className="form-control mb-2" name="fechaEvaluacion" value={values.fechaEvaluacion || ""} onChange={handle} />
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control mb-2" name="apellidos" placeholder='Apellidos' value={values.apellidos || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="genero" placeholder='Género' value={values.genero || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="escuela" placeholder='Escuela' value={values.escuela || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="grado" placeholder='Grado' value={values.grado || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="nombresTutor" placeholder='Nombre del Tutor' value={values.nombresTutor || ""} onChange={handle} />
                    <input type="text" className="form-control mb-2" name="telefono_tutor" placeholder='Teléfono del Tutor' value={values.telefono_tutor || ""} onChange={handle} />
                    <input type="email" className="form-control mb-2" name="correo_tutor" placeholder='Correo Electrónico del Tutor' value={values.correo_tutor || ""} onChange={handle} />
                </div>
            </div>
            <div className="text-end">
                <button className="btn btn-primary mt-3" onClick={onNext}>Siguiente</button>
            </div>
        </div>
    );
}

//Calcular edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return '';
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    return edad;
}