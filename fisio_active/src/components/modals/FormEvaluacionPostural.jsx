import React from "react";

/**
 * FormEvaluacionPostural
 * Paso de observación postural y palpación.
 *
 * Props
 *  - values   : JSON global
 *  - onChange : (patch) => void
 *  - onPrev   : () => void
 *  - onNext   : () => void
 */
export default function FormEvaluacionPostural({ values, onChange, onPrev, onNext }) {
    const v = values; // alias

    const handle = (e) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const radio = (name, opts) => (
        <div className="mb-3">
            <label className="form-label d-block capitalize">{name.replace(/([A-Z])/g, " $1")}</label>
            {opts.map((opt) => (
                <div className="form-check form-check-inline" key={opt}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        value={opt}
                        checked={v[name] === opt}
                        onChange={handle}
                    />
                    <label className="form-check-label">{opt}</label>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <h5 className="mb-4">Evaluación postural</h5>

            <input
                className="form-control mb-3"
                type="text"
                name="cabezaCuello"
                placeholder="Alineación de cabeza y cuello"
                value={v.cabezaCuello || ""}
                onChange={handle}
            />

            {radio("hombros", ["Simétricos", "Asimétricos"])}
            {radio("columna", ["Recta", "Escoliosis", "Cifosis", "Lordosis"])}
            {radio("pelvis", ["Nivelada", "Inclinada"])}
            {radio("extremidades", ["Alineadas", "Genu valgo", "Genu varo"])}
            {radio("arcoPlantar", ["Normal", "Pie plano", "Pie cavo"])}

            <textarea
                className="form-control mb-3"
                name="puntosDolorosos"
                placeholder="Puntos dolorosos"
                value={v.puntosDolorosos || ""}
                onChange={handle}
            />

            <label className="form-label">EVA (escala 0‑10): {v.evaDolor ?? 0}</label>
            <input
                type="range"
                className="form-range mb-3"
                name="evaDolor"
                min="0"
                max="10"
                value={v.evaDolor || 0}
                onChange={handle}
            />

            <textarea
                className="form-control mb-3"
                name="tejidosBlandos"
                placeholder="Hallazgos en tejidos blandos"
                value={v.tejidosBlandos || ""}
                onChange={handle}
            />

            <textarea
                className="form-control mb-4"
                name="estructurasOseas"
                placeholder="Hallazgos en estructuras óseas"
                value={v.estructurasOseas || ""}
                onChange={handle}
            />

            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={onPrev}>
                    Anterior
                </button>
                <button className="btn btn-primary" onClick={onNext}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}
