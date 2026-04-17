import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  // ✅ PRIMERO definir datos
  const storedProducts =
    JSON.parse(localStorage.getItem("products")) || products;

  const categorias = ["Laptops", "Smartphones", "Accesorios"];

  // ✅ DESPUÉS funciones
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 1) {
      const filtered = storedProducts.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 position-relative">

      {/* LOGO */}
      <Link className="navbar-brand text-white fw-bold fs-4" to="/">
        TechNova
      </Link>

      {/* MENÚ CATEGORÍAS */}
      <div
        className="text-white me-3 position-relative"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        style={{ cursor: "pointer" }}
      >
        Productos ⬇

        {showMenu && (
          <div className="position-absolute bg-white text-dark p-3 shadow rounded">
            {categorias.map((cat, i) => (
              <div
                key={i}
                className="dropdown-item"
                onClick={() => navigate(`/productos/${cat.toLowerCase()}`)}
                style={{ cursor: "pointer" }}
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUSCADOR */}
      <div style={{ width: "400px", position: "relative" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar en TechNova..."
          value={search}
          onChange={handleSearch}
        />

        {suggestions.length > 0 && (
          <div className="position-absolute bg-white w-100 shadow">
            {suggestions.slice(0, 5).map(p => (
              <div
                key={p.id}
                className="d-flex align-items-center p-2 border-bottom"
                onClick={() => {
                  navigate(`/producto/${p.id}`);
                  setSuggestions([]);
                  setSearch("");
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={p.img} width="40" className="me-2" alt={p.name} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CARRITO */}
      <Link to="/checkout" className="btn btn-warning ms-3">
        🛒 {cart.length}
      </Link>

    </nav>
  );
}

export default Navbar;