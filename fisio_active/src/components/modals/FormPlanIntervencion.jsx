import React from "react";

/**
 * FormPlanIntervencion — paso de plan terapéutico.
 *
 * Props:
 *   values   — JSON global del wizard
 *   onChange — (patch) => void
 *   onPrev   — retrocede al paso anterior
 *   onNext   — avanza al siguiente paso
 */
export default function FormPlanIntervencion({ values, onChange, onPrev, onNext }) {
    const v = values;
    const handle = (e) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    return (
        <div>
            <h5 className="mb-4">Plan de intervención</h5>

            {/* Objetivos */}
            <label className="form-label">1. Objetivos (corto, mediano y largo plazo)</label>
            <textarea className="form-control mb-3" name="objetivos" value={v.objetivos || ""} onChange={handle} />

            {/* Tratamiento */}
            <label className="form-label">2. Tratamiento fisioterapéutico propuesto</label>
            <textarea className="form-control mb-2" placeholder="Ejercicios de fortalecimiento" name="fortalecimiento" value={v.fortalecimiento || ""} onChange={handle} />
            <textarea className="form-control mb-2" placeholder="Ejercicios de estiramiento" name="estiramiento" value={v.estiramiento || ""} onChange={handle} />
            <textarea className="form-control mb-2" placeholder="Reeducación postural" name="reeducacionPostural" value={v.reeducacionPostural || ""} onChange={handle} />
            <textarea className="form-control mb-3" placeholder="Otras técnicas" name="otrasTecnicas" value={v.otrasTecnicas || ""} onChange={handle} />

            {/* Recomendaciones */}
            <label className="form-label">3. Recomendaciones generales</label>
            <div className="mb-3">
                <label className="form-label d-block">Uso de calzado adecuado:</label>
                {["Sí", "No", "No Especificar"].map((opt) => (
                    <div className="form-check form-check-inline" key={opt}>
                        <input className="form-check-input" type="radio" name="calzadoAdecuado" value={opt} checked={v.calzadoAdecuado === opt} onChange={handle} />
                        <label className="form-check-label">{opt}</label>
                    </div>
                ))}
                {v.calzadoAdecuado === "No Especificar" && (
                    <input className="form-control mt-2" type="text" name="especificarCalzado" placeholder="Especificar" value={v.especificarCalzado || ""} onChange={handle} />
                )}
            </div>
            <textarea className="form-control mb-2" placeholder="Actividades físicas recomendadas" name="actividadesRecomendadas" value={v.actividadesRecomendadas || ""} onChange={handle} />
            <textarea className="form-control mb-4" placeholder="Restricciones o precauciones" name="restricciones" value={v.restricciones || ""} onChange={handle} />

            {/* Seguimiento */}
            <label className="form-label">Notas de seguimiento</label>
            {[1, 2].map((n) => (
                <div className="mb-3" key={n}>
                    <input type="date" className="form-control mb-1" name={`seguimiento${n}Fecha`} value={v[`seguimiento${n}Fecha`] || ""} onChange={handle} />
                    <textarea className="form-control" placeholder="Observaciones" name={`seguimiento${n}Observaciones`} value={v[`seguimiento${n}Observaciones`] || ""} onChange={handle} />
                </div>
            ))}

            {/* Firmas */}
            <label className="form-label">Firmas</label>
            <input className="form-control mb-2" type="text" placeholder="Nombre del evaluador" name="nombreEvaluador" value={v.nombreEvaluador || ""} onChange={handle} />
            <input className="form-control mb-2" type="text" placeholder="Firma del evaluador" name="firmaEvaluador" value={v.firmaEvaluador || ""} onChange={handle} />
            <input className="form-control mb-2" type="text" placeholder="Nombre del padre/madre o tutor" name="nombreTutor" value={v.nombreTutor || ""} onChange={handle} />
            <input className="form-control mb-4" type="text" placeholder="Firma del tutor" name="firmaTutor" value={v.firmaTutor || ""} onChange={handle} />

            {/* Navegación */}
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-secondary" onClick={onPrev}>Anterior</button>
                <button className="btn btn-primary" onClick={onNext}>Siguiente</button>
            </div>
        </div>
    );
}
