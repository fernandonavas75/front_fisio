import React from "react";

export default function FormAntecedentesPersonales({ values, onChange, onClose, onNext, onPrev }) {
  const handle = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    // Convertir el valor a booleano si es vacunacion_completa
    if (name === "vacunacion_completa") {
      parsedValue = value === "true";
    }

    onChange({ [name]: parsedValue });
  };

  const handleNext = () => {
    if (values.vacunacion_completa === undefined || values.vacunacion_completa === "") {
      alert("Por favor, selecciona si la vacunación está completa.");
      return;
    }
    onNext(); // continúa si todo está bien
  };

  return (
    <div>
      <h5 className="mb-4">Antecedentes</h5>

      <textarea className="form-control mb-2" name="enfermedades_importantes" placeholder="Enfermedades Importantes" value={values.enfermedades_importantes || ""} onChange={handle}></textarea>
      <textarea className="form-control mb-2" name="cirugias_previas" placeholder="Cirugías Previas" value={values.cirugias_previas || ""} onChange={handle}></textarea>
      <textarea className="form-control mb-2" name="hospitalizaciones" placeholder="Hospitalizaciones" value={values.hospitalizaciones || ""} onChange={handle}></textarea>
      <textarea className="form-control mb-2" name="alergias" placeholder="Alergias" value={values.alergias || ""} onChange={handle}></textarea>
      <textarea className="form-control mb-2" name="medicamentos_actuales" placeholder="Medicamentos Actuales" value={values.medicamentos_actuales || ""} onChange={handle}></textarea>

      <select
        className="form-control mb-2"
        name="vacunacion_completa"
        value={
          values.vacunacion_completa === true
            ? "true"
            : values.vacunacion_completa === false
            ? "false"
            : ""
        }
        onChange={handle}
      >
        <option value="">¿Vacunación completa?</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>

      <textarea className="form-control mb-2" name="condiciones_hereditarias" placeholder="Condiciones Hereditarias" value={values.condiciones_hereditarias || ""} onChange={handle}></textarea>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={onPrev}>Anterior</button>
        <button className="btn btn-primary" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}
