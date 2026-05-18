import jsPDF from "jspdf";
import axios from "axios";

// ===================================================
// GENERAR ORDEN PDF DESDE DATOS MYSQL
// ===================================================

export const generarOrdenPDF = async (
  solicitud,
  interpretacion,
  proveedorId,
  orden
) => {

  try {

    // =========================================
    // OBTENER PROVEEDOR DESDE MYSQL
    // =========================================

    const proveedorRes = await axios.get(
      `http://localhost:3001/api/suppliers/${proveedorId}`
    );

    const proveedor = proveedorRes.data;

    // =========================================
    // CREAR PDF
    // =========================================

    const doc = new jsPDF();

    const fecha = new Date();

    const fechaTexto =
      fecha.toLocaleDateString("es-PE");

    const horaTexto =
      fecha.toLocaleTimeString("es-PE");

    let y = 20;

    // =========================================
    // HEADER
    // =========================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.text("TechNova Store", 20, y);

    y += 8;

    doc.setFontSize(15);

    doc.text(
      "ORDEN DE COMPRA INTELIGENTE",
      20,
      y
    );

    y += 10;

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    doc.text(
      "Sistema automatizado Procure-to-Pay",
      20,
      y
    );

    // =========================================
    // DATOS GENERALES
    // =========================================

    y += 15;

    doc.setFont("helvetica", "bold");

    doc.text("Fecha:", 20, y);

    doc.setFont("helvetica", "normal");

    doc.text(fechaTexto, 40, y);

    y += 6;

    doc.setFont("helvetica", "bold");

    doc.text("Hora:", 20, y);

    doc.setFont("helvetica", "normal");

    doc.text(horaTexto, 38, y);

    y += 6;

    doc.setFont("helvetica", "bold");

    doc.text("Orden ID:", 20, y);

    doc.setFont("helvetica", "normal");

    doc.text(
      orden.orderId || "N/A",
      50,
      y
    );

    // =========================================
    // SOLICITUD ORIGINAL
    // =========================================

    y += 15;

    doc.setFillColor(230, 230, 230);

    doc.rect(20, y - 5, 170, 8, "F");

    doc.setFont("helvetica", "bold");

    doc.text(
      "Solicitud Original",
      22,
      y
    );

    y += 10;

    doc.setFont("helvetica", "normal");

    const solicitudLines =
      doc.splitTextToSize(
        solicitud,
        165
      );

    doc.text(
      solicitudLines,
      20,
      y
    );

    y += solicitudLines.length * 6 + 8;

    // =========================================
    // INTERPRETACIÓN IA
    // =========================================

    doc.setFillColor(230, 230, 230);

    doc.rect(20, y - 5, 170, 8, "F");

    doc.setFont("helvetica", "bold");

    doc.text(
      "Interpretación IA",
      22,
      y
    );

    y += 10;

    doc.setFont("helvetica", "normal");

    doc.text(
      `Categoría detectada: ${interpretacion.category}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Cantidad solicitada: ${interpretacion.quantity}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Prioridad: ${interpretacion.priority}`,
      20,
      y
    );

    y += 6;

    doc.text(
      "Workflow IA: Procure-to-Pay Automated",
      20,
      y
    );

    // =========================================
    // PROVEEDOR MYSQL
    // =========================================

    y += 15;

    doc.setFillColor(230, 230, 230);

    doc.rect(20, y - 5, 170, 8, "F");

    doc.setFont("helvetica", "bold");

    doc.text(
      "Proveedor Seleccionado",
      22,
      y
    );

    y += 10;

    doc.setFont("helvetica", "normal");

    doc.text(
      `Proveedor: ${proveedor.name || "N/A"}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `RUC: ${proveedor.ruc || "N/A"}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Tiempo de entrega: ${proveedor.delivery || "N/A"}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Calificación: ${proveedor.rating || 0}/5`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Categoría: ${proveedor.category || "N/A"}`,
      20,
      y
    );

    // =========================================
    // DETALLE ORDEN
    // =========================================

    y += 15;

    doc.setFillColor(230, 230, 230);

    doc.rect(20, y - 5, 170, 8, "F");

    doc.setFont("helvetica", "bold");

    doc.text(
      "Detalle de la Orden",
      22,
      y
    );

    y += 10;

    doc.setFont("helvetica", "normal");

    doc.text(
      `Código de orden: ${orden.orderId}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Estado: ${orden.status}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Total estimado: S/ ${Number(
        orden.total || 0
      ).toFixed(2)}`,
      20,
      y
    );

    y += 6;

    doc.text(
      "Proveedor asignado automáticamente mediante IA",
      20,
      y
    );

    // =========================================
    // FOOTER
    // =========================================

    y += 20;

    doc.setFont("helvetica", "italic");

    doc.setFontSize(10);

    doc.text(
      "Documento generado automáticamente por TechNova AI Procurement",
      20,
      y
    );

    y += 6;

    doc.text(
      "Integración IA + n8n + React + MySQL",
      20,
      y
    );

    y += 6;

    doc.text(
      "TechNova Store - Perú",
      20,
      y
    );

    // =========================================
    // GUARDAR PDF
    // =========================================

    const nombreArchivo =
      `orden_compra_${orden.orderId}.pdf`;

    doc.save(nombreArchivo);

  } catch (error) {

    console.error(
      "Error generando orden PDF:",
      error
    );

  }
};