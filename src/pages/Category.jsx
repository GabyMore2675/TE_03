import { useParams, useLocation, useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Category() {
  const { categoria } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  // ✅ USAR LOCALSTORAGE
  const storedProducts =
    JSON.parse(localStorage.getItem("products")) || products;

  let filtered = storedProducts;

  // 🔥 FILTRO POR CATEGORÍA
  if (categoria && categoria !== "all") {
    filtered = filtered.filter(
      (p) => p.category === categoria
    );
  }

  // 🔎 FILTRO POR BUSQUEDA
  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ⬅ Volver
      </button>

      <h2 className="mb-4">
        {search
          ? `Resultados para "${search}"`
          : categoria === "all"
            ? "Todos los productos"
            : categoria?.toUpperCase()}
      </h2>

      <div className="row">
        {filtered.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p>No se encontraron productos</p>
      )}
    </div>
  );
}

export default Category;