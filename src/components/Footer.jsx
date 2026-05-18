import { Link } from "react-router-dom";

function Footer() {

  const year = new Date().getFullYear();

  return (
    <footer
      className="
        bg-dark
        text-white
        mt-5
        pt-5
        pb-3
        w-100
      "
    >

      <div className="container">

        <div className="row gy-4">

          {/* ================================= */}
          {/* EMPRESA */}
          {/* ================================= */}

          <div className="col-md-3">

            <h4 className="fw-bold mb-3">
              TechNova
            </h4>

            <p className="small text-light">
              Tecnología moderna, confiable
              y accesible para estudio,
              trabajo y entretenimiento.
            </p>

          </div>

          {/* ================================= */}
          {/* ENLACES */}
          {/* ================================= */}

          <div className="col-md-3">

            <h5 className="mb-3">
              Enlaces
            </h5>

            <Link
              to="/"
              className="
                text-decoration-none
                text-light
                d-block
                mb-2
              "
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              className="
                text-decoration-none
                text-light
                d-block
                mb-2
              "
            >
              Productos
            </Link>

            <Link
              to="/cart"
              className="
                text-decoration-none
                text-light
                d-block
              "
            >
              Carrito
            </Link>

          </div>

          {/* ================================= */}
          {/* CONTACTO */}
          {/* ================================= */}

          <div className="col-md-3">

            <h5 className="mb-3">
              Contacto
            </h5>

            <p className="mb-2">
              📧 tecnova@gmail.com
            </p>

            <p className="mb-2">
              📞 +51 987 654 321
            </p>

            <p className="mb-0">
              📍 Arequipa, Perú
            </p>

          </div>

          {/* ================================= */}
          {/* LEGAL */}
          {/* ================================= */}

          <div className="col-md-3">

            <h5 className="mb-3">
              Legal
            </h5>

            <Link
              to="/reclamaciones"
              className="
                text-decoration-none
                text-light
                d-block
                mb-2
              "
            >
              📄 Libro de Reclamaciones
            </Link>

            <Link
              to="/terminos"
              className="
                text-decoration-none
                text-light
                d-block
                mb-2
              "
            >
              Términos y Condiciones
            </Link>

            <Link
              to="/privacidad"
              className="
                text-decoration-none
                text-light
                d-block
              "
            >
              Política de Privacidad
            </Link>

          </div>

        </div>

        {/* ================================= */}
        {/* LINEA */}
        {/* ================================= */}

        <hr className="border-secondary mt-4" />

        {/* ================================= */}
        {/* COPYRIGHT */}
        {/* ================================= */}

        <div className="text-center small text-light">

          © {year} TechNova Store - Todos los derechos reservados

        </div>

      </div>
    </footer>
  );
}

export default Footer;