import jsPDF from "jspdf";

export const generarPDF = (cliente, carrito, metodo) => {
  const doc = new jsPDF();

  const fecha = new Date();
  const fechaTexto = fecha.toLocaleDateString("es-PE");
  const horaTexto = fecha.toLocaleTimeString("es-PE");

  let y = 20;

  // ================== TITULO ==================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TechNova Store", 20, y);

  y += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Boleta de Venta", 20, y);

  // ================== DATOS CLIENTE ==================
  y += 10;
  doc.text(`Cliente: ${cliente.nombre}`, 20, y);
  y += 6;
  doc.text(`Correo: ${cliente.email}`, 20, y);

  // ================== FECHA Y HORA ==================
  y += 6;
  doc.text(`Fecha: ${fechaTexto}`, 20, y);
  y += 6;
  doc.text(`Hora: ${horaTexto}`, 20, y);

  // ================== MÉTODO DE PAGO ==================
  y += 6;
  doc.text(`Método: ${metodo}`, 20, y);

  // ================== TABLA HEADER ==================
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Item", 20, y);
  doc.text("Producto", 30, y);
  doc.text("Cant", 100, y);
  doc.text("Precio", 120, y);
  doc.text("Precio Oferta", 145, y);
  doc.text("Total", 180, y);

  doc.setFont("helvetica", "normal");

  let total = 0;

  // ================== PRODUCTOS ==================
  carrito.forEach((item, i) => {
    const cantidad = item.qty || 1;
    const precioOriginal = item.price;
    const precioOferta = item.offerPrice || item.price; // usa oferta si existe
    const totalItem = cantidad * precioOferta;

    total += totalItem;

    y += 8;

    doc.text(String(i + 1), 20, y);
    doc.text(item.name.substring(0, 25), 30, y); // limita longitud
    doc.text(String(cantidad), 100, y);
    doc.text(`S/ ${precioOriginal.toFixed(2)}`, 120, y);
    doc.text(`S/ ${precioOferta.toFixed(2)}`, 145, y);
    doc.text(`S/ ${totalItem.toFixed(2)}`, 180, y);
  });

  // ================== CALCULOS (IGV 18%) ==================
  const subtotal = total / 1.18;
  const igv = total - subtotal;

  y += 12;
  doc.text(`Subtotal: S/ ${subtotal.toFixed(2)}`, 20, y);
  y += 6;
  doc.text(`IGV (18%): S/ ${igv.toFixed(2)}`, 20, y);

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: S/ ${total.toFixed(2)}`, 20, y);

  // ================== FOOTER ==================
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text("Gracias por su compra", 20, y);
  y += 6;
  doc.text("TechNova Store - Perú", 20, y);

  // ================== GUARDAR PDF ==================
  doc.save("boleta.pdf");
};