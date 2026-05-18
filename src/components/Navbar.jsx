import {
  useState,
  useContext,
  useEffect
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  CartContext
} from "../context/CartContext";

function Navbar() {

  // =========================================
  // STATES
  // =========================================

  const [search, setSearch] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [showMenu, setShowMenu] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  // =========================================
  // CONTEXT
  // =========================================

  const navigate = useNavigate();

  const { cart } =
    useContext(CartContext);

  // =========================================
  // LOAD PRODUCTS FROM DB / LOCALSTORAGE
  // =========================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const stored =
          localStorage.getItem("products");

        if (stored) {

          setProducts(JSON.parse(stored));

          return;
        }

        const response =
          await fetch(
            "http://localhost:5000/api/products"
          );

        const data =
          await response.json();

        setProducts(data);

        localStorage.setItem(
          "products",
          JSON.stringify(data)
        );

      } catch (error) {

        console.error(
          "Error cargando productos:",
          error
        );

      }

    };

    loadProducts();

  }, []);

  // =========================================
  // CATEGORÍAS
  // =========================================

  const categorias = [
    "Laptops",
    "Smartphones",
    "Accesorios"
  ];

  // =========================================
  // SEARCH
  // =========================================

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    if (value.trim().length > 1) {

      const filtered =
        products.filter((p) =>
          p.name
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )
        );

      setSuggestions(filtered);

    } else {

      setSuggestions([]);

    }

  };

  // =========================================
  // NAVIGATE PRODUCT
  // =========================================

  const goToProduct = (id) => {

    navigate(`/producto/${id}`);

    setSearch("");

    setSuggestions([]);

  };

  // =========================================
  // TOTAL CARRITO
  // =========================================

  const totalItems =
    cart.reduce(
      (acc, item) =>
        acc + (item.qty || 1),
      0
    );

  return (

    <nav
      className="
        navbar
        navbar-expand-lg
        navbar-dark
        px-4
        py-3
        sticky-top
      "
      style={{
        backdropFilter: "blur(15px)",
        background:
          "rgba(2,6,23,0.92)",
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
        zIndex: 999
      }}
    >

      {/* =========================================
          LOGO
      ========================================= */}

      <Link
        className="
          navbar-brand
          fw-bold
          fs-3
          d-flex
          align-items-center
        "
        to="/"
      >

        <span className="me-2">
          ⚡
        </span>

        TechNova

      </Link>

      {/* =========================================
          MOBILE BUTTON
      ========================================= */}

      <button
        className="navbar-toggler"
        onClick={() =>
          setMobileMenu(!mobileMenu)
        }
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* =========================================
          MENU
      ========================================= */}

      <div
        className={`
          collapse navbar-collapse
          ${mobileMenu ? "show" : ""}
        `}
      >

        {/* =========================================
            CATEGORÍAS
        ========================================= */}

        <div
          className="
            text-white
            ms-4
            me-4
            position-relative
          "
          onMouseEnter={() =>
            setShowMenu(true)
          }
          onMouseLeave={() =>
            setShowMenu(false)
          }
          style={{
            cursor: "pointer"
          }}
        >

          <div
            className="
              fw-semibold
              d-flex
              align-items-center
            "
          >

            Productos

            <span className="ms-2">
              ⬇
            </span>

          </div>

          {
            showMenu && (

              <div
                className="
                  position-absolute
                  mt-3
                  p-3
                  shadow-lg
                  rounded-4
                "
                style={{
                  width: "220px",
                  background:
                    "rgba(15,23,42,0.98)",
                  backdropFilter:
                    "blur(12px)",
                  border:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >

                {
                  categorias.map(
                    (cat, i) => (

                      <div
                        key={i}
                        className="
                          dropdown-item
                          text-white
                          p-2
                          rounded-3
                          mb-1
                        "
                        onClick={() =>
                          navigate(
                            `/productos/${cat.toLowerCase()}`
                          )
                        }
                        style={{
                          cursor: "pointer"
                        }}
                      >

                        {cat}

                      </div>

                    )
                  )
                }

              </div>

            )
          }

        </div>

        {/* =========================================
            SEARCH
        ========================================= */}

        <div
          className="mx-auto"
          style={{
            width: "420px",
            position: "relative"
          }}
        >

          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearch}
          />

          {/* SUGGESTIONS */}

          {
            suggestions.length > 0 && (

              <div
                className="
                  position-absolute
                  w-100
                  mt-2
                  shadow-lg
                  rounded-4
                  overflow-hidden
                "
                style={{
                  background:
                    "rgba(15,23,42,0.98)",
                  backdropFilter:
                    "blur(12px)",
                  zIndex: 9999,
                  border:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >

                {
                  suggestions
                    .slice(0, 5)
                    .map((p) => (

                      <div
                        key={p.id}
                        className="
                          d-flex
                          align-items-center
                          p-3
                          border-bottom
                        "
                        style={{
                          cursor: "pointer",
                          borderColor:
                            "rgba(255,255,255,0.08)"
                        }}
                        onClick={() =>
                          goToProduct(p.id)
                        }
                      >

                        <img
                          src={p.img}
                          alt={p.name}
                          width="55"
                          height="55"
                          className="
                            rounded-3
                            me-3
                          "
                          style={{
                            objectFit:
                              "cover"
                          }}
                        />

                        <div>

                          <div
                            className="
                              text-white
                              fw-semibold
                            "
                          >
                            {p.name}
                          </div>

                          <small
                            className="
                              text-info
                            "
                          >

                            S/

                            {
                              p.offerPrice ||
                              p.price
                            }

                          </small>

                        </div>

                      </div>

                    ))
                }

              </div>

            )
          }

        </div>

        {/* =========================================
            ACTIONS
        ========================================= */}

        <div
          className="
            d-flex
            align-items-center
            ms-lg-4
            mt-3
            mt-lg-0
          "
        >

          {/* PROCUREMENT */}

          <Link
            to="/procurement"
            className="
              btn
              btn-warning
              fw-bold
              me-3
            "
          >

            🤖 E-Procurement

          </Link>

          {/* CART */}

          <Link
            to="/checkout"
            className="
              btn
              btn-primary
              position-relative
              fw-bold
            "
          >

            🛒 Carrito

            {
              totalItems > 0 && (

                <span
                  className="
                    position-absolute
                    top-0
                    start-100
                    translate-middle
                    badge
                    rounded-pill
                    bg-danger
                  "
                >

                  {totalItems}

                </span>

              )
            }

          </Link>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;