import React from "react";

export default function FormAntecedentesPersonales({values,onChange,onClose,onNext,onPrev}){
    const handle = (e) =>{
        const {name,value}=e.target;
        onchange({[name]:value});
    };
    return(
        <div>
            <h5 className="mb-4">Antecedentes</h5>
            <textarea className="form-control mb-2" name="enfermedades_importantes" placeholder="Enfermedades Importantes" value={values.enfermedades_importantes || ""} onChange={handle}></textarea>
            <textarea className="form-control mb-2" name="cirugias_previas" placeholder="Cirugías Previas" value={values.cirugias_previas || ""} onChange={handle}></textarea>
            <textarea className="form-control mb-2" name="hospitalizaciones" placeholder="Hospitalizaciones" value={values.hospitalizaciones || ""} onChange={handle}></textarea>
            <textarea className="form-control mb-2" name="alergias" placeholder="Alergias" value={values.alergias || ""} onChange={handle}></textarea>
            <textarea className="form-control mb-2" name="medicamentos_actuales" placeholder="Medicamentos Actuales" value={values.medicamentos_actuales || ""} onChange={handle}></textarea>
            <select className="form-control mb-2" name="vacunacion_completa" value={values.vacunacion_completa || ""} onChange={handle}>
                <option value="">¿Vacunación completa?</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
            <textarea className="form-control mb-2" name="condiciones_hereditarias" placeholder="Condiciones Hereditarias" value={values.condiciones_hereditarias || ""} onChange={handle}></textarea>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={onPrev}>Anterior</button>
                <button className="btn btn-primary" onClick={onNext}>Siguiente</button>
            </div>
        </div>
    );
};