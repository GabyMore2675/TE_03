import emailjs from "emailjs-com";
import { producto } from "../context/CartContext";
import dotenv from "dotenv";

export const enviarCorreo = (cliente, carrito, metodo) => {

  const total = carrito.reduce(
    (acc, p) => acc + (p.offerPrice || p.price) * (p.qty || 1),
    0
  );

  const subtotal = total / 1.18;
  const igv = total - subtotal;

  const listaProductos = carrito.map(p =>
    `${p.name} x${p.qty} - S/ ${(p.offerPrice || p.price)}`
  ).join("\n");

  return emailjs.send(
    process.env.REACT_APP_EMAIL_SERVICE,
    process.env.REACT_APP_EMAIL_TEMPLATE,
    {
      nombre: cliente.nombre,
      email: cliente.email,
      producto: listaProductos,
      metodo: metodo,
      subtotal: subtotal.toFixed(2),
      igv: igv.toFixed(2),
      total: total.toFixed(2)
    },
    process.env.REACT_APP_EMAIL_PUBLIC_KEY
  );
};