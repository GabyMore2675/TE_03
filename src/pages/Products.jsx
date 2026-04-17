import { Link } from "react-router-dom";

function Products() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Categorías</h2>

      <div className="row">

        <div className="col-md-4">
          <Link to="/productos/laptops" className="card p-3 text-center shadow">
            <h4>💻 Laptops</h4>
            <p>Equipos para estudio, trabajo y gaming.</p>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/productos/smartphones" className="card p-3 text-center shadow">
            <h4>📱 Smartphones</h4>
            <p>Los mejores teléfonos del mercado.</p>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/productos/accesorios" className="card p-3 text-center shadow">
            <h4>🎧 Accesorios</h4>
            <p>Complementos esenciales para tu setup.</p>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Products;