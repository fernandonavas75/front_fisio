import React from "react";

/**
 * FormEvaluacionFuncional
 * Paso de evaluación funcional dentro del Wizard.
 *
 * Props:
 *  - values   : objeto global con todos los campos
 *  - onChange : (patch) => void          → actualiza valores en el padre
 *  - onNext   : () => void               → botón siguiente
 *  - onPrev   : () => void               → botón anterior
 */
export default function FormEvaluacionFuncional({ values, onChange, onNext, onPrev }) {
  const v = values;

  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const patchTabla = (clave, grado) => {
    onChange({
      tablaFuerzaMuscular: {
        ...(v.tablaFuerzaMuscular || {}),
        [clave]: String(grado),
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Marcha, equilibrio, ROM, FUERZA, ETC */}
      <RadioGroup
        label="Marcha"
        name="marcha_estado"
        value={v.marcha_estado}
        options={["Normal", "Alterada"]}
        onChange={handle}
      />

      {v.marcha_estado === "Alterada" && (
        <input
          type="text"
          className="marcha_descripcion"
          name="marchaDescripcion"
          placeholder="Describa la alteración"
          value={v.marchaDescripcion || ""}
          onChange={handle}
        />
      )}

      <RadioGroup
        label="Equilibrio"
        name="equilibrio_estado"
        value={v.equilibrio_estado}
        options={["Bueno", "Regular", "Malo"]}
        onChange={handle}
      />

      <RadioGroup
        label="Rango de movimiento"
        name="rango_movimiento_estado"
        value={v.rango_movimiento_estado}
        options={["Normal", "Disminuido"]}
        onChange={handle}
      />

      {v.rango_movimiento_estado === "Disminuido" && (
        <input
          className="form-control mb-3"
          type="text"
          name="rango_movimiento_areas"
          placeholder="Áreas afectadas"
          value={v.rango_movimiento_areas || ""}
          onChange={handle}
        />
      )}

      {/* Tablas por valoración por grupo */}
      <TablaGrupo
        titulo="Miembro Superior"
        filas={[
          ["hombroFlexion", "Hombro: Flexión"],
          ["hombroExtension", "Hombro: Extensión"],
          ["hombroAbduccion", "Hombro: Abducción"],
          ["codoFlexion", "Codo: Flexión"],
          ["codoExtension", "Codo: Extensión"],
          ["munecaExtension", "Muñeca: Extensión"],
          ["munecaFlexion", "Muñeca: Flexión"],
          ["munecaAbduccion", "Muñeca: Abducción"],
          ["dedosFlexion", "Dedos: Flexión"],
          ["dedosExtension", "Dedos: Extensión"],
          ["pulgar", "Pulgar: Oposición"],
        ]}
        data={v.tablaFuerzaMuscular || {}}
        setVal={patchTabla}
      />

      <TablaGrupo
        titulo="Miembro Inferior"
        filas={[
          ["caderaFlexion", "Cadera: Flexión"],
          ["caderaExtension", "Cadera: Extensión"],
          ["caderaAbduccion", "Cadera: Abducción"],
          ["caderaAduccion", "Cadera: Aducción"],
          ["rodillaFlexion", "Rodilla: Flexión"],
          ["rodillaExtension", "Rodilla: Extensión"],
          ["tobilloDorsiflexion", "Tobillo: Dorsiflexión"],
          ["tobilloPlantiflexion", "Tobillo: Plantiflexión"],
          ["pieInversion", "Pie: Inversión"],
          ["pieEversion", "Pie: Eversión"],
        ]}
        data={v.tablaFuerzaMuscular || {}}
        setVal={patchTabla}
      />

      <TablaGrupo
        titulo="Tronco"
        filas={[
          ["troncoFlexion", "Tronco: Flexión"],
          ["troncoExtension", "Tronco: Extensión"],
          ["troncoRotacion", "Tronco: Rotación"],
        ]}
        data={v.tablaFuerzaMuscular || {}}
        setVal={patchTabla}
      />

      {/* Pruebas específicas */}
      <RadioGroup
        label="Test de Adams (escoliosis)"
        name="testAdams"
        value={v.testAdams}
        options={["Positivo", "Negativo"]}
        onChange={handle}
      />

      <RadioGroup
        label="Test de Jack (pie plano)"
        name="testJack"
        value={v.testJack}
        options={["Positivo", "Negativo"]}
        onChange={handle}
      />

      <textarea
        className="form-control mb-4"
        name="otrasPruebas"
        placeholder="Otras pruebas realizadas"
        value={v.otrasPruebas || ""}
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

/* -------------------------- helpers reutilizables ----------------------- */

function RadioGroup({ label, name, value, options, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}:</label>
      {options.map((opt) => (
        <div className="form-check form-check-inline" key={opt}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
          />
          <label className="form-check-label">{opt}</label>
        </div>
      ))}
    </div>
  );
}

function TablaGrupo({ titulo, filas, data, setVal }) {
  return (
    <div className="table-responsive-md mt-4">
      <h6>{titulo}</h6>
      <table className="table table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th className="text-start">Grupo / Movimiento</th>
            {[0, 1, 2, 3, 4, 5].map((g) => (
              <th key={g}>{g}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map(([key, label]) => (
            <tr key={key}>
              <td className="text-start">{label}</td>
              {[0, 1, 2, 3, 4, 5].map((g) => (
                <td key={g}>
                  <input
                    type="radio"
                    name={key}
                    value={g}
                    checked={data[key] === String(g)}
                    onChange={() => setVal(key, g)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
