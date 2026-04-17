import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row">

          <div className="col-md-3 mb-4">
            <h4 className="fw-bold">TechNova</h4>
            <p className="small">
              Tecnología moderna, confiable y accesible.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Enlaces</h5>
            <Link to="/" className="text-white d-block">Inicio</Link>
            <Link to="/productos" className="text-white d-block">Productos</Link>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Contacto</h5>
            <p>📧 tecnova@gmail.com</p>
            <p>📞 +51 987 654 321</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Legal</h5>
            <Link to="/reclamaciones" className="text-white d-block">
              📄 Libro de Reclamaciones
            </Link>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center small">
          © 2026 TechNova Store
        </div>
      </div>
    </footer>
  );
}

export default Footer;