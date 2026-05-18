import jsPDF from "jspdf";

export const generarPDF = (cliente, carrito, metodo) => {
  const doc = new jsPDF();

  const fecha = new Date();

  const fechaTexto = fecha.toLocaleDateString("es-PE");
  const horaTexto = fecha.toLocaleTimeString("es-PE");

  let y = 20;

  // =========================================
  // CONFIG GENERAL
  // =========================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("TechNova Store", 20, y);

  y += 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text("Boleta de Venta Electrónica", 20, y);

  // =========================================
  // DATOS EMPRESA
  // =========================================

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Empresa:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text("TechNova Store S.A.C.", 45, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.text("RUC:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text("20123456789", 35, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Dirección:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text("Arequipa - Perú", 45, y);

  // =========================================
  // DATOS CLIENTE
  // =========================================

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Cliente:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text(cliente.nombre || "Consumidor Final", 45, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Correo:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text(cliente.email || "-", 40, y);

  // =========================================
  // FECHA Y MÉTODO
  // =========================================

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Fecha:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text(fechaTexto, 38, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Hora:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text(horaTexto, 35, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Método de pago:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text(metodo, 65, y);

  // =========================================
  // TABLA HEADER
  // =========================================

  y += 14;

  doc.setFillColor(230, 230, 230);
  doc.rect(20, y - 5, 170, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text("#", 22, y);
  doc.text("Producto", 32, y);
  doc.text("Cant.", 100, y);
  doc.text("P.Unit", 120, y);
  doc.text("Total", 165, y);

  doc.setFont("helvetica", "normal");

  // =========================================
  // PRODUCTOS
  // =========================================

  let total = 0;

  carrito.forEach((item, index) => {

    const cantidad = item.qty || 1;

    const precio =
      Number(item.offer_price) ||
      Number(item.offerPrice) ||
      Number(item.price);

    const totalItem = cantidad * precio;

    total += totalItem;

    y += 10;

    // salto página
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.text(String(index + 1), 22, y);

    doc.text(
      item.name.substring(0, 30),
      32,
      y
    );

    doc.text(String(cantidad), 102, y);

    doc.text(
      `S/ ${precio.toFixed(2)}`,
      120,
      y
    );

    doc.text(
      `S/ ${totalItem.toFixed(2)}`,
      165,
      y
    );
  });

  // =========================================
  // TOTALES
  // =========================================

  const subtotal = total / 1.18;
  const igv = total - subtotal;

  y += 18;

  doc.setFont("helvetica", "normal");

  doc.text(
    `Subtotal: S/ ${subtotal.toFixed(2)}`,
    130,
    y
  );

  y += 6;

  doc.text(
    `IGV (18%): S/ ${igv.toFixed(2)}`,
    130,
    y
  );

  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text(
    `TOTAL: S/ ${total.toFixed(2)}`,
    125,
    y
  );

  // =========================================
  // FOOTER
  // =========================================

  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    "Gracias por comprar en TechNova Store",
    20,
    y
  );

  y += 6;

  doc.text(
    "Documento generado automáticamente",
    20,
    y
  );

  y += 6;

  doc.text(
    "Contacto: tecnova@gmail.com",
    20,
    y
  );

  // =========================================
  // GUARDAR PDF
  // =========================================

  const nombreArchivo =
    `boleta_${cliente.nombre || "cliente"}_${Date.now()}.pdf`;

  doc.save(nombreArchivo);
};