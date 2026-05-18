import emailjs from "emailjs-com";

// ========================================
// FORMATEAR MONEDA
// ========================================

const formatCurrency = (value) => {

  return Number(value).toLocaleString(
    "es-PE",
    {
      style: "currency",
      currency: "PEN"
    }
  );
};

// ========================================
// GENERAR NÚMERO DE ORDEN
// ========================================

const generateOrderNumber = () => {

  return `TN-${Date.now()}`;

};

// ========================================
// ENVIAR CORREO
// ========================================

export const enviarCorreo = async (
  cliente,
  carrito,
  metodo
) => {

  try {

    // ================================
    // VALIDACIONES
    // ================================

    if (!cliente) {
      throw new Error("Cliente inválido");
    }

    if (!carrito || carrito.length === 0) {
      throw new Error("Carrito vacío");
    }

    // ================================
    // CALCULAR TOTALES
    // ================================

    const total = carrito.reduce(
      (acc, p) => {

        const price =
          p.offerPrice ||
          p.offer_price ||
          p.price ||
          0;

        return (
          acc +
          price * (p.qty || 1)
        );

      },
      0
    );

    const subtotal = total / 1.18;

    const igv = total - subtotal;

    // ================================
    // GENERAR LISTA PRODUCTOS
    // ================================

    const listaProductos = carrito
      .map((p, index) => {

        const price =
          p.offerPrice ||
          p.offer_price ||
          p.price;

        return `
${index + 1}. ${p.name}
Cantidad: ${p.qty || 1}
Precio: ${formatCurrency(price)}
Subtotal: ${formatCurrency(
  price * (p.qty || 1)
)}
`;

      })
      .join("\n");

    // ================================
    // NÚMERO ORDEN
    // ================================

    const orderNumber =
      generateOrderNumber();

    // ================================
    // FECHA
    // ================================

    const fecha =
      new Date().toLocaleString(
        "es-PE"
      );

    // ================================
    // TEMPLATE PARAMS
    // ================================

    const templateParams = {

      // CLIENTE
      nombre:
        cliente.nombre,

      email:
        cliente.email,

      // ORDEN
      orden:
        orderNumber,

      fecha:
        fecha,

      // PRODUCTOS
      productos:
        listaProductos,

      // PAGO
      metodo:
        metodo,

      // TOTALES
      subtotal:
        formatCurrency(subtotal),

      igv:
        formatCurrency(igv),

      total:
        formatCurrency(total),

      // MENSAJE EXTRA
      mensaje:
        "Gracias por comprar en TechNova Store. Tu pedido fue procesado correctamente."
    };

    // ================================
    // ENVIAR EMAIL
    // ================================

    const response =
      await emailjs.send(

        process.env.REACT_APP_EMAIL_SERVICE,

        process.env.REACT_APP_EMAIL_TEMPLATE,

        templateParams,

        process.env.REACT_APP_EMAIL_PUBLIC_KEY

      );

    console.log(
      "Correo enviado:",
      response.status,
      response.text
    );

    return response;

  } catch (error) {

    console.error(
      "Error enviando correo:",
      error
    );

    throw error;
  }
};