import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { generarPDF } from "../services/pdfService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { enviarCorreo } from "../services/emailService";

function Checkout() {
  const { cart, removeFromCart, updateQty, setCart, msg } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState("resumen"); // resumen | metodo | yape | paypal
  const [metodo, setMetodo] = useState("");
  const [cliente, setCliente] = useState({ nombre: "", email: "" });

  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [paypalData, setPaypalData] = useState({ email: "", pass: "" });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [aceptaTerminos, setAceptaTerminos] = useState(false); // ✅ checkbox
  const [showTerminos, setShowTerminos] = useState(false);

  // ✅ total usando precio de oferta si existe
  const total = cart.reduce(
    (acc, p) => acc + (p.offerPrice || p.price) * (p.qty || 1),
    0
  );

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dominiosValidos = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
    if (!regex.test(email)) return false;
    const dominio = email.split("@")[1];
    return dominiosValidos.includes(dominio);
  };

  const validarTelefono = (telefono) => /^[0-9]{9}$/.test(telefono);

  // ----------------- FLUJO -----------------
  const seleccionarMetodo = (m) => {
    setMetodo(m);
    if (m === "Yape") {
      if (total > 500) {
        Swal.fire(
          "Monto excedido",
          "Yape solo permite hasta S/500. Usa PayPal.",
          "warning"
        );
        setMetodo("PayPal");
        setStep("paypal");
      } else setStep("yape");
    }
    if (m === "PayPal") setStep("paypal");
  };

  const procesarPago = () => {
    if (!aceptaTerminos) {
      Swal.fire("Debe aceptar términos y condiciones", "Marca la casilla para continuar", "warning");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const exito = Math.random() > 0.2;
      if (exito) {
        generarPDF(cliente, cart, metodo);
        enviarCorreo(cliente, cart, metodo)
          .then(() => console.log("Correo enviado"))
          .catch((error) => console.error("Error correo:", error));

        setSuccess(true);

        // Reducir stock
        const storedProducts = JSON.parse(localStorage.getItem("products")) || products;
        cart.forEach((item) => {
          const prod = storedProducts.find((p) => p.id === item.id);
          if (prod) prod.stock -= item.qty;
        });
        localStorage.setItem("products", JSON.stringify(storedProducts));
        setCart([]);

        setTimeout(() => navigate("/"), 3000);

        Swal.fire("Pago exitoso", "Tu boleta fue generada", "success");
      } else {
        Swal.fire("Error", "No se pudo procesar el pago", "error");
      }
    }, 2500);
  };

  // ----------------- UI -----------------
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Checkout</h2>

        {/* MENSAJE GLOBAL */}
        {msg && (
          <div className="alert alert-success text-center">
            {msg}
          </div>
        )}

        {success && (
          <div className="text-center mt-4">
            <div className="text-success" style={{ fontSize: "60px" }}>✔</div>
            <h4 className="mt-3">Pago exitoso</h4>
            <p>Gracias por tu compra. Redirigiendo...</p>
          </div>
        )}

        {/* RESUMEN */}
        {step === "resumen" && (
          <>
            <div className="list-group mb-3">
              {cart.map((p, i) => (
                <div
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-1">{p.name}</h6>

                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: "70px" }}
                        value={p.qty || 1}
                        min="1"
                        onChange={(e) => updateQty(i, Number(e.target.value))}
                      />

                      <span>S/ {p.offerPrice ? p.offerPrice : p.price}</span>
                    </div>
                  </div>

                  <div className="text-end">
                    <p className="mb-1 fw-bold">
                      S/ {((p.offerPrice || p.price) * (p.qty || 1)).toFixed(2)}
                    </p>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm(`¿Estás seguro que deseas sacar "${p.name}" del carrito?`)) {
                          removeFromCart(i);
                        }
                      }}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-end mb-3">Total: S/ {total.toFixed(2)}</h4>

            <div className="mb-3">
              <input
                className="form-control mb-2"
                placeholder="Nombre"
                onChange={(e) =>
                  setCliente({ ...cliente, nombre: e.target.value })
                }
              />
              <input
                className="form-control"
                placeholder="Correo"
                onChange={(e) =>
                  setCliente({ ...cliente, email: e.target.value })
                }
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={() => {
                if (cart.length === 0) {
                  Swal.fire("Carrito vacío", "Agrega productos antes de pagar", "warning");
                  return;
                }
                if (!cliente.nombre || !cliente.email) {
                  Swal.fire("Error", "Completa tus datos", "warning");
                  return;
                }
                if (!validarEmail(cliente.email)) {
                  Swal.fire("Correo inválido", "Usa un correo real", "error");
                  return;
                }
                setStep("metodo");
              }}
            >
              Confirmar pago
            </button>
          </>
        )}

        {/* MÉTODO */}
        {step === "metodo" && (
          <div className="text-center">
            <h4 className="mb-3">Selecciona método</h4>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => seleccionarMetodo("Yape")}
            >
              Yape
            </button>
            <button
              className="btn btn-dark w-100"
              onClick={() => seleccionarMetodo("PayPal")}
            >
              PayPal
            </button>
            <button
              className="btn btn-outline-dark w-100 mt-3"
              onClick={() => setStep("resumen")}
            >
              ⬅ Volver al resumen
            </button>
          </div>
        )}

        {/* YAPE */}
        {step === "yape" && (
          <>
            <h4 className="mb-3 text-center">Pago con Yape</h4>
            <input
              className="form-control mb-2"
              placeholder="Número de teléfono"
              onChange={(e) => setTelefono(e.target.value)}
            />
            <input
              className="form-control mb-3"
              placeholder="Código de verificación"
              onChange={(e) => setCodigo(e.target.value)}
            />

            {/* ✅ Checkbox términos */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="aceptaTerminos"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="aceptaTerminos">
                Acepto <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowTerminos(true)}>términos y condiciones</span>
              </label>
            </div>

            <button
              className="btn btn-outline-secondary w-100 mb-2"
              onClick={() => setStep("metodo")}
            >
              ⬅ Volver a métodos de pago
            </button>

            <button
              className="btn btn-success w-100"
              onClick={() => {
                if (!validarTelefono(telefono)) {
                  Swal.fire("Teléfono inválido", "Debe tener 9 dígitos", "error");
                  return;
                }
                if (!codigo) {
                  Swal.fire("Código requerido", "Ingresa el código", "warning");
                  return;
                }
                procesarPago();
              }}
            >
              Pagar con Yape
            </button>
          </>
        )}

        {/* PAYPAL */}
        {step === "paypal" && (
          <>
            <h4 className="mb-3 text-center">Pago con PayPal</h4>
            <input
              className="form-control mb-2"
              placeholder="Correo PayPal"
              onChange={(e) =>
                setPaypalData({ ...paypalData, email: e.target.value })
              }
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Contraseña"
              onChange={(e) =>
                setPaypalData({ ...paypalData, pass: e.target.value })
              }
            />

            {/* ✅ Checkbox términos */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="aceptaTerminosPaypal"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="aceptaTerminosPaypal">
                Acepto <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowTerminos(true)}>términos y condiciones</span>
              </label>
            </div>

            <button
              className="btn btn-outline-secondary w-100 mb-2"
              onClick={() => setStep("metodo")}
            >
              ⬅ Volver a métodos de pago
            </button>
            <button
              className="btn btn-dark w-100"
              onClick={() => {
                if (!paypalData.email || !paypalData.pass) {
                  Swal.fire("Error", "Completa datos de PayPal", "warning");
                  return;
                }
                procesarPago();
              }}
            >
              Pagar con PayPal
            </button>
          </>
        )}

        {loading && (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Procesando pago...</p>
          </div>
        )}

        {/* ------------------ MODAL DE TERMINOS MEJORADO ------------------ */}
        {showTerminos && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.6)", zIndex: 9999 }}
          >
            <div
              className="bg-white rounded shadow"
              style={{
                width: "80%",
                maxHeight: "80%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              {/* HEADER FIJO */}
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="mb-0">Términos y Condiciones</h5>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowTerminos(false)}
                >
                  X
                </button>
              </div>

              {/* CONTENIDO CON SCROLL */}
              <div className="p-3 overflow-auto" style={{ flex: 1 }}>
                <h6>1. Objeto</h6>
                <p>
                  Estos Términos y Condiciones regulan la compra de productos y servicios en TechNova Store.
                  Al realizar una compra, usted acepta todas las disposiciones aquí establecidas.
                </p>

                <h6>2. Pagos</h6>
                <p>
                  Todas las transacciones se procesan mediante métodos seguros como Yape y PayPal.
                  El pago se considera completado únicamente cuando se confirma la transacción.
                  TechNova Store no se hace responsable por errores en los datos ingresados por el cliente.
                </p>

                <h6>3. Política de envíos y devoluciones</h6>
                <p>
                  Los productos se envían según stock disponible. Si el producto presenta defectos de fábrica,
                  el cliente puede solicitar devolución o cambio dentro de los 7 días posteriores a la compra.
                  Se requiere conservar la boleta y el producto en condiciones originales.
                </p>

                <h6>4. Responsabilidad</h6>
                <p>
                  TechNova Store no se hace responsable por daños directos o indirectos derivados del uso de los productos.
                  Se recomienda leer las especificaciones antes de la compra.
                </p>

                <h6>5. Privacidad y seguridad</h6>
                <p>
                  La información personal proporcionada será utilizada únicamente para procesar pedidos y contacto relacionado con la compra.
                  TechNova Store protege los datos de acuerdo con la legislación peruana vigente.
                </p>

                <h6>6. Atención al cliente</h6>
                <p>
                  Para consultas, reclamos o seguimiento de pedidos, puede contactarnos al correo tecnova@gmail.com o al teléfono 987654321.
                </p>

                <h6>7. Aceptación</h6>
                <p>
                  Al marcar la casilla de “Acepto términos y condiciones”, usted declara haber leído, entendido y aceptado todas las cláusulas aquí descritas.
                </p>
              </div>

              {/* FOOTER */}
              <div className="p-3 border-top d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={() => setShowTerminos(false)}>
                  ⬅ Volver
                </button>
                <button className="btn btn-primary" onClick={() => setShowTerminos(false)}>
                  Ya lo leí
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Checkout;