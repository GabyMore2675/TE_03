function WorkflowArchitecture() {

  const steps = [

    {
      icon: "📥",
      title: "Webhook",
      desc: "Recepción solicitud"
    },

    {
      icon: "🤖",
      title: "LLM",
      desc: "Interpretación IA"
    },

    {
      icon: "📊",
      title: "Clasificación",
      desc: "Categoría y prioridad"
    },

    {
      icon: "🗄",
      title: "Base Datos",
      desc: "Consulta proveedores"
    },

    {
      icon: "🏢",
      title: "Proveedor",
      desc: "Selección automática"
    },

    {
      icon: "📄",
      title: "Orden",
      desc: "Generación OC"
    },

    {
      icon: "📧",
      title: "Email",
      desc: "Notificación automática"
    },

    {
      icon: "💳",
      title: "Pago",
      desc: "Proceso Procure-to-Pay"
    }

  ];

  return (

    <div className="card shadow p-4 mb-5">

      <h3 className="mb-4 text-center">
        ⚙ Arquitectura Inteligente n8n + LLM
      </h3>

      <div className="row justify-content-center">

        {
          steps.map((step, index) => (

            <div
              className="col-md-3 mb-4"
              key={index}
            >

              <div
                className="card h-100 text-center p-4 border-0 shadow-sm"
                style={{
                  transition: "0.3s"
                }}
              >

                <div
                  style={{
                    fontSize: "45px"
                  }}
                >
                  {step.icon}
                </div>

                <h5 className="mt-3">
                  {step.title}
                </h5>

                <p className="text-muted">
                  {step.desc}
                </p>

              </div>

            </div>

          ))
        }

      </div>

      {/* FLUJO */}

      <div className="mt-4">

        <div
          className="progress"
          style={{ height: "25px" }}
        >

          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: "100%" }}
          >
            Workflow automatizado con IA
          </div>

        </div>

      </div>

    </div>

  );
}

export default WorkflowArchitecture;