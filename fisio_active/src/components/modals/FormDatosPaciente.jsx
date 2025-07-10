import React from 'react';

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

 export default function FormDatosPaciente({values, onChange,onPrev,onNext}){
    const handle = (e) => {
        const {name,value} = e.target;
        onChange({[name]: value});
   };

   return(
    <div>
    <h5 className='mb-4'> Datos del Paciente</h5>
    <div className="row">
        {/*columna inzquierda*/}
        <div className="col-md-6">
            <input type="text" className="form-control mb-2" name="id_paciente" placeholder='Nombres' value={values.nombres || ""} onChange={handle}/> //Tabla Paciente
            <input type="text" className="form-control mb-2" name="edad" placeholder='Edad' value={values.edad || ""} onChange={handle} /> //Tabl Historial Clinico
            <input type="text" className ="form-cotrol mb-2" name="estatura" placeholder='Estatura (cm)' value={values.estatura || ""} onChange={handle} /> // Tabla Historial Clinico
            <input type="date" className='form-control mb-2' name='fecha_nacimiento' placeholder='Fecha de nacimiento' value={values.fechaNacimiento || ""}/> // Tabla Paciente
            <input type="date" className='form-control mb-2' name="fecha_evaluacion" value={values.fechaEvaluacion || ""} onChange={handle} /> // Tabla Historial Clinico
            </div>
            {/*Columna derecha*/}
            <div className="col-md-6">
                <input type="text" className='form-control mb-2' name="apellidos" placeholder='Apellidos' value={values.apellidos || ""} onChange={handle}/> //Tabla Paciente
                <input type="text" className='form-control mb-2'name="genero" placeholder='Genero' value={values.genero || ""} onChange={handle} /> // Tabla Paciente
                <input type="text" className='form-conttol mb-2' name='escuela' placeholder='Escuela' value={values.escuela || ""} onChange={handle}/> //Tabla Historial Clinico
                <input type="text" className='form-control mb-2' name="grado" placeholder='Grado' value={values.grado || ""} onChange={handle} /> //Tabla Historial Clinico
                <input type="text" className='form-control mb-2' name='nombres_tutor' placeholder='Nombre del Tutor' value={values.nombresTutor}/> //Tabla Historial Clinico
                <input type="text" className='form-control mb-2' name='telefono_tutor' placeholder='Telefono del Tutor' value={values.telefono_tutor} onChange={handle} /> //Tabla Historial Clinico
                <input type="email" className='form-control  mb-2' name='correo_tutor' placeholder='Correo Electronico del Tutor' value={values.correo_tutor} onChange={handle}/> //Tabla Historial Clinico
            </div>
        </div>
        <div className="text-end">
            <button className="btn btn-primart mt-3" onClick={onNext}>Siguiente</button>
        </div>
    </div>
    
   );
 }