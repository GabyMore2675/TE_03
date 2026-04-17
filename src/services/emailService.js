import emailjs from "emailjs-com";

export const enviarCorreo = (cliente, producto, metodo) => {

  // ✅ cálculos (igual que tu PDF)
  const total = producto.offerPrice || producto.price;
  const subtotal = total / 1.18;
  const igv = total - subtotal;

  return emailjs.send(
    "service_9blvnpx",
    "template_nzhzwfh",
    {
      nombre: cliente.nombre,
      email: cliente.email,
      producto: producto.name,
      precio: total,
      metodo: metodo,
      subtotal: subtotal.toFixed(2),
      igv: igv.toFixed(2),
      total: total.toFixed(2)
    },
    "AzlvQrjw81eBQzoNY"
  );
};