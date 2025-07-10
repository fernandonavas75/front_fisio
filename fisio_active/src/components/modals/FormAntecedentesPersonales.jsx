import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

export default function FormAntecedentesPersonales({values,onChange,onClose,onNext,onPrev}){
    const handle = (e) =>{
        const {name,value}=e.target;
        onchange({[name]:value});
    };
    return(
        <div>
            <h5 className="mb-4">Antecedentes</h5>
            <textarea className="form-control mb-2" name ="enfermedades_importantes" placeholder="Enfermedades Importantes" value={values.enfermedades_importantes || " " } onChange={handle}></textarea> //Tabla antecedentes
            <textarea className="form-control mb-2" name = "cirugias_previas" placeholder="Cirujias Previas" value={values.cirugias_previas || " " } onchange={handle}></textarea> //Tabla Antecedentes
            <textarea className="form-control mb-2" name = "hospitalizaciones" placeholder="Hospitalizaciones" value={values.hospitalizaciones || " "} onchange={handle}></textarea> //Tabla Antecendentes
            <textarea className="form-control mb-2" name = "alergias" placeholder="Alergias" value={values.alergias || " "} onChange={handle}></textarea> //Tabla Antecedente
            <textarea className="form-control mb-2" name= "medicamentos_actuales" placeholder="Medicamentos Actuales" value={values.medicamentos_actuales || " "} onchange={handle}></textarea> //Tabla Antecente
            //Verificar ya que este de aca es un campo booleano
            <textarea className="form-control mb-2" name="vacunacion_completa" placeholder="Vacunacion Completa" value={values.enf_musculoesqueleticas_familia || " "} onchange={ handle}></textarea> //Tabla Antecedente check boolean
            <textarea className="condiciones_hereditarias" name="Condiciones Hereditarias" value={values.condiciones_hereditarias || " " } onchange={handle}></textarea> //Tabla Antecedente
            //check id_historia prymary key en teoria no se debe topar eso porque se autoincrementa tosn aham check luego
            {}
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={onPrev}>Anterior</button>
                <button className="btn btn-primary" onClick={onNext}> Siguiente</button>
            </div>

        </div>
    );
};