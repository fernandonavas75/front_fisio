// src/pages/AgendarFicha.js
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
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

import "../pages/AgendarFicha.css"; // Importa tu CSS si aún no lo haces

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
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [active, setActive] = useState("paciente");
  const [sugerencia] = useState(""); // usado antes para depurar
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading spinner
  const [isSubmitting, setIsSubmitting] = useState(false); // para evitar múltiples envíos

  const patch = useCallback((obj) => setData((d) => ({ ...d, ...obj })), []);

  const idx = steps.findIndex((s) => s.id === active);
  const { label, Comp } = steps[idx];

  /* helpers de navegación */
  const goPrev = () =>
    setActive(steps[(idx - 1 + steps.length) % steps.length].id);
  const goNext = () => setActive(steps[(idx + 1) % steps.length].id);

  return (
    <div className="contenedor-ficha">
      {/* Botonera scroll-horizontal */}
      <div className="botonera-scroll">
        {steps.map(({ id, label }) => (
          <StepButton
            key={id}
            label={label}
            active={id === active}
            onClick={() => setActive(id)}
          />
        ))}
      </div>

      <hr className="linea-divisoria" />

      {/* Panel central desplazable */}
      <div className="panel-central">
        <h4 className="titulo-etapa">{label}</h4>

        <div className="contenedor-formulario">
          <Comp
            values={data}
            onChange={patch}
            onPrev={goPrev}
            onNext={goNext}
            onFinish={async () => {
              if (isSubmitting) return;
              setIsSubmitting(true);
              setIsLoading(true);
              guardarEnLocalStorage("ficha_paciente", data);
              console.log("Enviar a la API →", data);

              try {
                // 1. Intentar guardar la ficha, pero sin bloquear si falla
                try {
                  const response = await api.post('/ficha-completa/guardar-ficha', data);
                  console.log("Ficha guardada correctamente:", response.data);
                } catch (errorGuardado) {
                  console.warn("Error al guardar la ficha, pero se continuará con la IA:", errorGuardado);
                }

                // 2. Generar sugerencias con IA (esto sí es obligatorio)
                const sugerencias = await enviarHistorialAOpenAI(data);
                console.log("Sugerencias recibidas:", sugerencias);

                // 3. Redirigir
                navigate("/sugerencias", { state: { sugerencias } });

              } catch (err) {
                console.error(err);
                alert("Error al generar sugerencias con IA.");
              } finally {
                setIsLoading(false);
              }

            }}
          />
        </div>

        {isLoading && (
          <div className="overlay-cargando">
            <div className="spinner"></div>
            <p>Cargando sugerencias...</p>
          </div>
        )}
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
