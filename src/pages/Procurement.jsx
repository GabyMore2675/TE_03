import { useState } from "react";
import Swal from "sweetalert2";

import {
  interpretPurchaseRequest,
  aiRecommendSupplier,
  generateAIResponse
} from "../services/aiService";

import { generarOrdenPDF }
  from "../services/procurementPdfService";

import ProcurementDashboard
  from "../components/ProcurementDashboard";

import WorkflowArchitecture
  from "../components/WorkflowArchitecture";

function Procurement() {

  const [prompt, setPrompt] = useState("");

  const [resultadoIA, setResultadoIA] = useState(null);

  const [loading, setLoading] = useState(false);

  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("procurementHistory")) || []
  );

  const procesarSolicitud = async () => {

    if (!prompt.trim()) {
      Swal.fire(
        "Campo vacío",
        "Escribe una solicitud de compra",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {

      // =============================
      // 1. INTERPRETAR SOLICITUD
      // =============================
      const interpretacion =
        await interpretPurchaseRequest(prompt);

      // =============================
      // 2. RECOMENDAR PROVEEDOR
      // =============================
      const proveedor =
        await aiRecommendSupplier(
          interpretacion.category
        );

      // =============================
      // 3. GENERAR ORDEN
      // =============================
      const orden =
        await generateAIResponse({
          ...interpretacion,
          proveedor
        });

      setResultadoIA({
        interpretacion,
        proveedor,
        orden
      });

      const nuevoHistorial = [
        {
          fecha: new Date().toLocaleString(),
          solicitud: prompt,
          proveedor: proveedor.name,
          prioridad: interpretacion.priority,
          categoria: interpretacion.category
        },
        ...historial
      ];

      setHistorial(nuevoHistorial);

      localStorage.setItem(
        "procurementHistory",
        JSON.stringify(nuevoHistorial)
      );

      Swal.fire(
        "Proceso completado",
        "La IA procesó la solicitud correctamente",
        "success"
      );

    } catch (error) {

      console.error(error);

      Swal.fire(
        "Error",
        "No se pudo procesar la solicitud",
        "error"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4">

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-3">
            <h6>Solicitudes IA</h6>
            <h3 className="text-primary">128</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-3">
            <h6>Órdenes generadas</h6>
            <h3 className="text-success">
              {historial.length}
            </h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-3">
            <h6>Proveedores activos</h6>
            <h3 className="text-warning">14</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-3">
            <h6>Ahorro estimado</h6>
            <h3 className="text-danger">18%</h3>
          </div>
        </div>

      </div>
      <div className="card shadow p-4 mb-4">

        <h4 className="mb-4">
          🔄 Flujo Procure-to-Pay
        </h4>

        <div className="d-flex justify-content-between flex-wrap text-center">

          <div>
            <div className="badge bg-primary p-3">
              Solicitud
            </div>
          </div>

          <div>
            <div className="badge bg-info p-3">
              IA interpreta
            </div>
          </div>

          <div>
            <div className="badge bg-warning p-3">
              Selección proveedor
            </div>
          </div>

          <div>
            <div className="badge bg-success p-3">
              Orden compra
            </div>
          </div>

          <div>
            <div className="badge bg-dark p-3">
              Pago
            </div>
          </div>

        </div>

      </div>

      <div className="card shadow p-4 mb-4">

        <h4 className="mb-4">
          ⚙ Workflow Automatizado (n8n)
        </h4>

        <div className="row text-center">

          <div className="col-md-2">
            <div className="border rounded p-3">
              📥<br />
              Webhook
            </div>
          </div>

          <div className="col-md-2">
            <div className="border rounded p-3">
              🤖<br />
              LLM
            </div>
          </div>

          <div className="col-md-2">
            <div className="border rounded p-3">
              📊<br />
              Clasificación
            </div>
          </div>

          <div className="col-md-2">
            <div className="border rounded p-3">
              🏢<br />
              Proveedor
            </div>
          </div>

          <div className="col-md-2">
            <div className="border rounded p-3">
              📄<br />
              Orden
            </div>
          </div>

          <div className="col-md-2">
            <div className="border rounded p-3">
              📧<br />
              Notificación
            </div>
          </div>

        </div>

      </div>

      <div className="card shadow p-4">

        <h2 className="mb-4 text-center">
          🤖 E-Procurement Inteligente
        </h2>

        <p className="text-muted text-center">
          Ingrese una solicitud de compra en lenguaje natural.
        </p>

        {/* INPUT */}
        <textarea
          className="form-control mb-3"
          rows="5"
          placeholder="Ejemplo: Necesito 5 laptops Lenovo para el área de desarrollo"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* BOTÓN */}
        <button
          className="btn btn-primary"
          onClick={procesarSolicitud}
          disabled={loading}
        >
          {
            loading
              ? "Procesando..."
              : "Procesar solicitud con IA"
          }
        </button>

        <ProcurementDashboard historial={historial} />

        <WorkflowArchitecture />

      </div>

      {/* RESULTADOS */}
      {
        resultadoIA && (

          <div className="mt-5">

            {/* INTERPRETACIÓN */}
            <div className="card shadow p-4 mb-4">

              <h4>
                🧠 Interpretación del LLM
              </h4>

              <hr />

              <p>
                <strong>Categoría:</strong>{" "}
                {resultadoIA.interpretacion.category}
              </p>

              <p>
                <strong>Cantidad:</strong>{" "}
                {resultadoIA.interpretacion.quantity}
              </p>

              <p>
                <strong>Prioridad:</strong>{" "}
                {resultadoIA.interpretacion.priority}
              </p>

            </div>

            {/* PROVEEDOR */}
            <div className="card shadow p-4 mb-4">

              <h4>
                🏢 Proveedor recomendado
              </h4>

              <hr />

              <p>
                <strong>Proveedor:</strong>{" "}
                {resultadoIA.proveedor.name}
              </p>

              <p>
                <strong>RUC:</strong>{" "}
                {resultadoIA.proveedor.ruc}
              </p>

              <p>
                <strong>Tiempo de entrega:</strong>{" "}
                {resultadoIA.proveedor.delivery}
              </p>

              <p>
                <strong>Calificación:</strong>{" "}
                {resultadoIA.proveedor.rating}/5
              </p>

            </div>

            <div className="mt-3">

              <span className="badge bg-success me-2">
                Proveedor verificado
              </span>

              <span className="badge bg-primary me-2">
                Entrega rápida
              </span>

              <span className="badge bg-warning text-dark">
                IA Score: 95%
              </span>

            </div>

            {/* ORDEN */}
            <div className="card shadow p-4">

              <h4>
                📄 Orden de compra generada
              </h4>

              <hr />

              <div className="mb-3">

                <span className="badge bg-success p-2">
                  ✔ Orden aprobada automáticamente
                </span>

              </div>

              <pre
                style={{
                  background: "#0f172a",
                  color: "#22c55e",
                  padding: "15px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  overflowX: "auto"
                }}
              >
                {
                  JSON.stringify(
                    resultadoIA.orden,
                    null,
                    2
                  )
                }
              </pre>

              <button
                className="btn btn-success mt-3"
                onClick={() =>
                  generarOrdenPDF(
                    prompt,
                    resultadoIA.interpretacion,
                    resultadoIA.proveedor,
                    resultadoIA.orden
                  )
                }
              >
                📄 Descargar Orden PDF
              </button>

            </div>

            <div className="card shadow p-4 mt-4">

              <h4 className="mb-4">
                📚 Historial de órdenes inteligentes
              </h4>

              {
                historial.length === 0 ? (

                  <p className="text-muted">
                    No hay órdenes registradas.
                  </p>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>

                        <tr>
                          <th>Fecha</th>
                          <th>Categoría</th>
                          <th>Proveedor</th>
                          <th>Prioridad</th>
                        </tr>

                      </thead>

                      <tbody>

                        {
                          historial.map((item, index) => (

                            <tr key={index}>

                              <td>{item.fecha}</td>

                              <td>
                                <span className="badge bg-primary">
                                  {item.categoria}
                                </span>
                              </td>

                              <td>{item.proveedor}</td>

                              <td>

                                {
                                  item.prioridad === "alta" ? (
                                    <span className="badge bg-danger">
                                      Alta
                                    </span>
                                  ) : (
                                    <span className="badge bg-success">
                                      Normal
                                    </span>
                                  )
                                }

                              </td>

                            </tr>

                          ))
                        }

                      </tbody>

                    </table>

                  </div>

                )
              }

            </div>

          </div>

        )
      }

    </div>

  );
}

export default Procurement;