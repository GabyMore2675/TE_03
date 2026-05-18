import { Link } from "react-router-dom";

function Products() {
  const categories = [
    {
      name: "Laptops",
      icon: "💻",
      desc: "Equipos para estudio, trabajo y gaming.",
      route: "/productos/laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      name: "Smartphones",
      icon: "📱",
      desc: "Los mejores teléfonos del mercado.",
      route: "/productos/smartphones",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      name: "Accesorios",
      icon: "🎧",
      desc: "Complementos esenciales para tu setup.",
      route: "/productos/accesorios",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ];

  return (
    <div className="container mt-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Categorías de Productos
        </h1>

        <p className="text-muted">
          Explora nuestra selección de tecnología premium
        </p>
      </div>

      {/* BOTÓN TODOS */}
      <div className="text-center mb-5">
        <Link
          to="/productos/all"
          className="btn btn-dark btn-lg px-4"
        >
          Ver todos los productos
        </Link>
      </div>

      {/* CATEGORÍAS */}
      <div className="row g-4">

        {categories.map((cat, index) => (
          <div className="col-md-4" key={index}>

            <Link
              to={cat.route}
              className="text-decoration-none text-dark"
            >

              <div
                className="card shadow-lg border-0 h-100 overflow-hidden"
                style={{
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >

                {/* IMAGEN */}
                <img
                  src={cat.image}
                  className="card-img-top"
                  alt={cat.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />

                {/* BODY */}
                <div className="card-body text-center p-4">

                  <h3 className="fw-bold">
                    {cat.icon} {cat.name}
                  </h3>

                  <p className="text-muted mt-3">
                    {cat.desc}
                  </p>

                  <button className="btn btn-primary mt-2">
                    Ver productos
                  </button>

                </div>
              </div>

            </Link>
          </div>
        ))}

      </div>

      {/* EXTRA INFO */}
      <div className="mt-5 text-center">

        <div className="card shadow-sm border-0 p-4">

          <h4 className="fw-bold mb-3">
            ¿Por qué comprar en TechNova?
          </h4>

          <div className="row">

            <div className="col-md-4">
              <h5>🚚 Envíos rápidos</h5>
              <p className="text-muted">
                Entregas seguras en todo el Perú.
              </p>
            </div>

            <div className="col-md-4">
              <h5>🔒 Compra segura</h5>
              <p className="text-muted">
                Métodos de pago protegidos y confiables.
              </p>
            </div>

            <div className="col-md-4">
              <h5>⭐ Garantía oficial</h5>
              <p className="text-muted">
                Productos originales con garantía.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Products;