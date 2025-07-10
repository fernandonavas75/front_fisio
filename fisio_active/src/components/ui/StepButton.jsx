export default function StepButton({ label, onClick }) {
    return (
        <button className="btn btn-outline-secondary me-2 mb-2" onClick={onClick}>
            {label}
        </button>
    );
}
