import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ToastMessage() {

  const { msg } = useContext(CartContext);

  // =========================================
  // NO MOSTRAR SI NO HAY MENSAJE
  // =========================================

  if (!msg) return null;

  // =========================================
  // DETECTAR TIPO DE MENSAJE
  // =========================================

  const isError =
    msg.includes("❌") ||
    msg.includes("⚠️");

  const bgColor = isError
    ? "bg-danger"
    : "bg-success";

  return (

    <div
      className={`
        position-fixed
        bottom-0
        end-0
        m-4
        px-4
        py-3
        rounded-4
        shadow-lg
        text-white
        ${bgColor}
      `}
      style={{
        zIndex: 9999,
        minWidth: "320px",
        maxWidth: "420px",
        fontWeight: "500",
        animation: "fadeIn 0.3s ease"
      }}
    >

      <div className="d-flex align-items-center justify-content-between">

        <div>

          {
            isError
              ? "⚠️ Notificación"
              : "✅ Operación exitosa"
          }

          <div
            style={{
              fontSize: "14px",
              marginTop: "4px"
            }}
          >
            {msg}
          </div>

        </div>

      </div>

    </div>

  );
}

export default ToastMessage;