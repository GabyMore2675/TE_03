import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

import {
  Bar,
  Pie
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function ProcurementDashboard({ historial = [] }) {

  // =========================================
  // MÉTRICAS
  // =========================================

  const totalOrdenes =
    historial.length;

  const altaPrioridad =
    historial.filter(
      (h) =>
        h.prioridad === "alta"
    ).length;

  const categorias = {};

  historial.forEach((h) => {

    const categoria =
      h.categoria || "Sin categoría";

    categorias[categoria] =
      (categorias[categoria] || 0) + 1;

  });

  const proveedores = {};

  historial.forEach((h) => {

    const proveedor =
      h.proveedor || "Sin proveedor";

    proveedores[proveedor] =
      (proveedores[proveedor] || 0) + 1;

  });

  // =========================================
  // DATA BAR
  // =========================================

  const barData = {

    labels:
      Object.keys(categorias),

    datasets: [
      {
        label:
          "Compras por categoría",

        data:
          Object.values(categorias),

        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#dc2626",
          "#7c3aed"
        ],

        borderRadius: 8
      }
    ]
  };

  // =========================================
  // OPTIONS BAR
  // =========================================

  const barOptions = {

    responsive: true,

    plugins: {

      legend: {
        display: false
      }

    }

  };

  // =========================================
  // DATA PIE
  // =========================================

  const pieData = {

    labels:
      Object.keys(proveedores),

    datasets: [
      {
        label:
          "Proveedores",

        data:
          Object.values(proveedores),

        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#dc2626",
          "#7c3aed",
          "#0ea5e9"
        ]
      }
    ]
  };

  // =========================================
  // SIN DATOS
  // =========================================

  if (historial.length === 0) {

    return (

      <div className="mt-5">

        <div className="alert alert-info">

          📊 Aún no existen órdenes registradas
          para mostrar en el dashboard.

        </div>

      </div>

    );

  }

  return (

    <div className="mt-5">

      {/* ===================================== */}
      {/* TITULO */}
      {/* ===================================== */}

      <h3 className="mb-4 fw-bold">

        📊 Dashboard Inteligente Procurement

      </h3>

      {/* ===================================== */}
      {/* KPIs */}
      {/* ===================================== */}

      <div className="row mb-4">

        {/* TOTAL */}

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0 p-4 text-center h-100">

            <h6 className="text-muted">

              Total Órdenes

            </h6>

            <h2 className="text-primary fw-bold">

              {totalOrdenes}

            </h2>

          </div>

        </div>

        {/* PRIORIDAD */}

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0 p-4 text-center h-100">

            <h6 className="text-muted">

              Alta Prioridad

            </h6>

            <h2 className="text-danger fw-bold">

              {altaPrioridad}

            </h2>

          </div>

        </div>

        {/* PROVEEDORES */}

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0 p-4 text-center h-100">

            <h6 className="text-muted">

              Proveedores Utilizados

            </h6>

            <h2 className="text-success fw-bold">

              {
                Object.keys(
                  proveedores
                ).length
              }

            </h2>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* GRÁFICAS */}
      {/* ===================================== */}

      <div className="row">

        {/* BAR CHART */}

        <div className="col-md-6 mb-4">

          <div className="card shadow border-0 p-4 h-100">

            <h5 className="mb-4 fw-bold">

              📦 Compras por Categoría

            </h5>

            <Bar
              data={barData}
              options={barOptions}
            />

          </div>

        </div>

        {/* PIE CHART */}

        <div className="col-md-6 mb-4">

          <div className="card shadow border-0 p-4 h-100">

            <h5 className="mb-4 fw-bold">

              🏢 Distribución de Proveedores

            </h5>

            <Pie data={pieData} />

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProcurementDashboard;