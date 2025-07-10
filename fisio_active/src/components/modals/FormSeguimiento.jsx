import React from "react";

/**
 * FormSeguimiento
 * Paso final: registro de evolución y cierre.
 *
 * Props
 *  - values   : JSON global
 *  - onChange : (patch) => void
 *  - onPrev   : () => void  (botón Anterior)
 *  - onFinish : () => void  (botón Finalizar)
 */
export default function FormSeguimiento({ values, onChange, onPrev, onFinish }) {
    const v = values;

    const set = (obj) => onChange(obj);

    const updateSeguimiento = (idx, field, val) => {
        const arr = [...(v.seguimiento || Array(6).fill({}))];
        arr[idx] = { ...(arr[idx] || {}), [field]: val };
        set({ seguimiento: arr });
    };

    return (
        <div>
            <h5 className="mb-4">Registro de Seguimiento y Evolución</h5>

            <div className="mb-3">
                <label className="form-label">Nombre del paciente:</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombrePaciente"
                    value={v.nombrePaciente || ""}
                    onChange={(e) => set({ nombrePaciente: e.target.value })}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Edad:</label>
                <input
                    type="number"
                    className="form-control"
                    name="edadPaciente"
                    value={v.edadPaciente || ""}
                    onChange={(e) => set({ edadPaciente: e.target.value })}
                />
            </div>

            {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div className="border rounded p-3 mb-4" key={idx}>
                    <h6>Registro #{idx + 1}</h6>

                    <div className="mb-2">
                        <label className="form-label">Fecha:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={v.seguimiento?.[idx]?.fecha || ""}
                            onChange={(e) => updateSeguimiento(idx, "fecha", e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Intervenciones realizadas:</label>
                        <textarea
                            rows="3"
                            className="form-control"
                            value={v.seguimiento?.[idx]?.intervenciones || ""}
                            onChange={(e) => updateSeguimiento(idx, "intervenciones", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="form-label">
                            Observaciones relevantes (dolor, fuerza, movilidad, etc.):
                        </label>
                        <textarea
                            rows="3"
                            className="form-control"
                            value={v.seguimiento?.[idx]?.observaciones || ""}
                            onChange={(e) => updateSeguimiento(idx, "observaciones", e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-secondary" onClick={onPrev}>Anterior</button>
                <button className="btn btn-success" onClick={onFinish}>Finalizar</button>
            </div>
        </div>
    );
}
