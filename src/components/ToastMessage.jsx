import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ToastMessage() {
  const { msg } = useContext(CartContext);

  if (!msg) return null; // no mostrar si no hay mensaje

  return (
    <div
      className="position-fixed bottom-0 end-0 m-3 bg-success text-white px-4 py-2 rounded shadow"
      style={{ zIndex: 9999, minWidth: "250px" }}
    >
      {msg}
    </div>
  );
}

export default ToastMessage;