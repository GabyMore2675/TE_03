import { useState } from "react";

import {
  generateAIResponse,
  interpretPurchaseRequest,
  aiRecommendSupplier,
  detectNormalConversation
} from "../services/aiService";

function ProcurementChatbot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hola 👋 Soy el asistente IA de TechNova Procurement.\n\nPuedo ayudarte con compras, proveedores y órdenes inteligentes."
    }
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================================
  // ENVIAR MENSAJE
  // =========================================

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {

      // =====================================
      // CONVERSACIÓN NORMAL
      // =====================================

      const normalReply =
        detectNormalConversation(currentInput);

      if (normalReply) {

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: normalReply
          }
        ]);

        setLoading(false);

        return;
      }

      // =====================================
      // INTERPRETAR SOLICITUD
      // =====================================

      const interpreted =
        await interpretPurchaseRequest(
          currentInput
        );

      // =====================================
      // VALIDAR SI ES SOLICITUD REAL
      // =====================================

      if (!interpreted) {

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "❌ No pude identificar una solicitud válida.\n\nEjemplos:\n\n• Necesito 5 laptops Lenovo\n• Comprar smartphones Samsung\n• Cotizar accesorios gaming"
          }
        ]);

        setLoading(false);

        return;
      }

      // =====================================
      // BUSCAR PROVEEDOR EN MYSQL
      // =====================================

      const supplier =
        await aiRecommendSupplier(
          interpreted.category
        );

      if (!supplier) {

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "⚠️ No encontré proveedores disponibles para esa categoría."
          }
        ]);

        setLoading(false);

        return;
      }

      // =====================================
      // GENERAR RESPUESTA IA
      // =====================================

      const aiData =
        await generateAIResponse({
          ...interpreted,
          proveedor: supplier
        });

      // =====================================
      // RESPUESTA
      // =====================================

      const response =
        `📦 Categoría detectada: ${aiData.procurement_type}

📊 Cantidad solicitada: ${aiData.quantity}

⚡ Prioridad: ${aiData.priority}

🏢 Proveedor recomendado: ${aiData.supplier}

🚚 Tiempo de entrega: ${aiData.estimated_delivery}

🧠 Workflow: ${aiData.workflow}

✅ Orden inteligente generada correctamente`;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response
        }
      ]);

    } catch (error) {

      console.error(
        "Error IA Procurement:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ Ocurrió un error procesando la solicitud."
        }
      ]);

    } finally {

      setLoading(false);

    }
  };

  return (

    <>

      {/* ===================================== */}
      {/* BOTÓN FLOTANTE */}
      {/* ===================================== */}

      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          background: "#2563eb",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        🤖
      </div>

      {/* ===================================== */}
      {/* CHAT */}
      {/* ===================================== */}

      {
        open && (

          <div
            style={{
              position: "fixed",
              bottom: "100px",
              right: "25px",
              width: "380px",
              height: "560px",
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0 5px 25px rgba(0,0,0,0.3)"
            }}
          >

            {/* HEADER */}

            <div
              style={{
                background: "#2563eb",
                color: "white",
                padding: "15px",
                fontWeight: "bold",
                fontSize: "18px"
              }}
            >
              🤖 Procurement IA Assistant
            </div>

            {/* MENSAJES */}

            <div
              style={{
                flex: 1,
                padding: "15px",
                overflowY: "auto",
                background: "#f1f5f9"
              }}
            >

              {
                messages.map(
                  (msg, index) => (

                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user"
                            ? "flex-end"
                            : "flex-start",
                        marginBottom: "12px"
                      }}
                    >

                      <div
                        style={{
                          maxWidth: "80%",
                          background:
                            msg.sender === "user"
                              ? "#2563eb"
                              : "white",
                          color:
                            msg.sender === "user"
                              ? "white"
                              : "black",
                          padding: "12px",
                          borderRadius: "15px",
                          whiteSpace: "pre-line"
                        }}
                      >
                        {msg.text}
                      </div>

                    </div>

                  )
                )
              }

              {
                loading && (
                  <p className="text-muted">
                    IA escribiendo...
                  </p>
                )
              }

            </div>

            {/* INPUT */}

            <div
              style={{
                padding: "10px",
                borderTop: "1px solid #ddd"
              }}
            >

              <div className="d-flex gap-2">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Escribe una solicitud..."
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      sendMessage();

                    }

                  }}
                />

                <button
                  className="btn btn-primary"
                  onClick={sendMessage}
                  disabled={loading}
                >
                  ➤
                </button>

              </div>

            </div>

          </div>

        )
      }

    </>

  );
}

export default ProcurementChatbot;