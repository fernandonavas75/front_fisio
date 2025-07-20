import React, { useState, useCallback } from "react";

// utils, importes
import { guardarEnLocalStorage } from "../utils/LocalStorageGuardar";
import ModalWrapper from "../components/ui/ModalWrapper";
import { enviarHistorialAOpenAI } from "../utils/enviarHistorial";

// UI
import StepButton from "../components/ui/StepButton";

// Formularios
import FormDatosPaciente from "../components/modals/FormDatosPaciente";
import FormAntecedentesPersonales from "../components/modals/FormAntecedentesPersonales";
// import FormAntecedentesFamiliares from "../components/modals/FormAntecedentesFamiliares";
import FormEvaluacionPostural from "../components/modals/FormEvaluacionPostural";
import FormEvaluacionFuncional from "../components/modals/FormEvaluacionFuncional";
import FormPlanIntervencion from "../components/modals/FormPlanIntervencion";
import FormSeguimiento from "../components/modals/FormSeguimiento";

/* pasos */
const steps = [
  { id: "paciente", label: "Datos paciente", Comp: FormDatosPaciente },
  { id: "antePer", label: "Ant. personales", Comp: FormAntecedentesPersonales },
  // { id: "anteFam", label: "Ant. familiares", Comp: FormAntecedentesFamiliares },
  { id: "postural", label: "Eval. postural", Comp: FormEvaluacionPostural },
  { id: "funcional", label: "Eval. funcional", Comp: FormEvaluacionFuncional },
  { id: "plan", label: "Plan intervención", Comp: FormPlanIntervencion },
  { id: "seguim", label: "Seguimiento", Comp: FormSeguimiento },
];

export default function HistoriaWizard() {
  const [data, setData] = useState({});
  const [active, setActive] = useState("paciente");

  const [sugerencia, setSugerencia] = useState("");
  const [showModal, setShowModal] = useState(false);

  const patch = useCallback((obj) => setData((d) => ({ ...d, ...obj })), []);

  const idx = steps.findIndex((s) => s.id === active);
  const { label, Comp } = steps[idx];

  /* helpers de navegación */
  const goPrev = () =>
    setActive(steps[(idx - 1 + steps.length) % steps.length].id);
  const goNext = () => setActive(steps[(idx + 1) % steps.length].id);

  return (
    <div className="p-4 space-y-4">
      {/* Botonera scroll-horizontal */}
      <div className="flex overflow-x-auto gap-2 pb-1">
        {steps.map(({ id, label }) => (
          <StepButton
            key={id}
            label={label}
            active={id === active}
            onClick={() => setActive(id)}
          />
        ))}
      </div>

      <hr className="border-t border-zinc-300 dark:border-zinc-600" />

      {/* Panel central desplazable */}
      <div className="w-full max-w-7xl mx-auto">
        <h4 className="mb-3">{label}</h4>

        {/* alto flexible:  calc(100vh - cabeceras)  */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 220px)" }}
        >
          <Comp
            values={data}
            onChange={patch}
            onPrev={goPrev}
            onNext={goNext}
            onFinish={async () => {
              guardarEnLocalStorage("ficha_paciente", data);
              console.log("Enviar a la API →", data);

              try {
                const sugerencias = await enviarHistorialAOpenAI(data);
                console.log('Sugerencias recibidas:', sugerencias);
                setSugerencia(sugerencias);
                setShowModal(true);
              } catch (err) {
                //console.error("Error al obtener sugerencias de IA:", error);
                alert("Error al generar sugerencias.");
              }
            }}
          />
        </div>
      </div>

      <ModalWrapper
        show={showModal}
        title="Sugerencias de tratamiento"
        onClose={() => setShowModal(false)}
      >
        <pre className="whitespace-pre-wrap text-sm">{sugerencia}</pre>
      </ModalWrapper>
    </div>
  );
}
