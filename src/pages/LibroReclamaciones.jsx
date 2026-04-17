import { useState } from "react";
import jsPDF from "jspdf";

function LibroReclamaciones() {
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    motivo: "",
    descripcion: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    // Validaciones
    if (!form.nombre || !form.dni || !form.telefono || !form.email || !form.motivo || !form.descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!/^\d{8}$/.test(form.dni)) {
      setError("DNI debe tener 8 dígitos");
      return;
    }
    if (!/^\d{9}$/.test(form.telefono)) {
      setError("Teléfono debe tener 9 dígitos");
      return;
    }
    if (!validarEmail(form.email)) {
      setError("Correo inválido");
      return;
    }

    setError("");

    // Generar PDF
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Libro de Reclamaciones - TechNova Store", 20, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, y);
    y += 6;
    doc.text(`Hora: ${new Date().toLocaleTimeString()}`, 20, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Datos del reclamante", 20, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(`Nombre: ${form.nombre}`, 20, y);
    y += 6;
    doc.text(`DNI: ${form.dni}`, 20, y);
    y += 6;
    doc.text(`Teléfono: ${form.telefono}`, 20, y);
    y += 6;
    doc.text(`Correo: ${form.email}`, 20, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Motivo de la reclamación", 20, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(form.motivo, 20, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Descripción detallada", 20, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    const lines = doc.splitTextToSize(form.descripcion, 170);
    doc.text(lines, 20, y);

    y += lines.length * 6 + 10;
    doc.setFont("helvetica", "bold");
    doc.text("¡Gracias por registrar tu reclamación!", 20, y);

    doc.save(`reclamacion_${form.nombre}.pdf`);
    alert("Reclamación enviada y descargada como PDF ✔");
    
    // Limpiar formulario
    setForm({ nombre: "", dni: "", telefono: "", email: "", motivo: "", descripcion: "" });
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Libro de Reclamaciones</h2>
      <p className="text-center text-muted">
        Complete los campos y envíe su reclamación. Se descargará un comprobante en PDF.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">DNI</label>
            <input
              type="text"
              className="form-control"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              maxLength="8"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              maxLength="9"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Motivo de la reclamación</label>
            <select
              className="form-select"
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
            >
              <option value="">Seleccione un motivo</option>
              <option value="Producto defectuoso">Producto defectuoso</option>
              <option value="Entrega tardía">Entrega tardía</option>
              <option value="Atención al cliente">Atención al cliente</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              rows="4"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="btn btn-danger w-100" onClick={handleSubmit}>
            Enviar Reclamación
          </button>
        </div>
      </div>
    </div>
  );
}

export default LibroReclamaciones;