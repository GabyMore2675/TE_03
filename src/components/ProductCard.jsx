import { useContext } from "react";

import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } =
    useContext(CartContext);

  // =========================================
  // IMAGEN
  // =========================================

  const image =
    product.image_url ||
    "https://via.placeholder.com/400x300?text=Sin+Imagen";

  // =========================================
  // PRECIOS
  // =========================================

  const price =
    Number(product.price);

  const offerPrice =
    Number(product.offer_price);

  const hasOffer =
    offerPrice > 0;

  // =========================================
  // STOCK
  // =========================================

  const stock =
    Number(product.stock);

  return (

    <div className="card shadow-sm border-0 h-100 rounded-4 overflow-hidden">

      {/* ===================================== */}
      {/* IMAGEN */}
      {/* ===================================== */}

      <Link
        to={`/producto/${product.id}`}
        className="text-decoration-none"
      >

        <div
          style={{
            height: "260px",
            overflow: "hidden",
            background: "#fff"
          }}
        >

          <img
            src={image}
            className="card-img-top h-100"
            alt={product.name}
            style={{
              objectFit: "contain",
              padding: "15px",
              transition: "0.3s"
            }}
          />

        </div>

      </Link>

      {/* ===================================== */}
      {/* BODY */}
      {/* ===================================== */}

      <div className="card-body d-flex flex-column">

        {/* CATEGORÍA */}

        <small className="text-muted mb-2 text-uppercase">

          {product.category}

        </small>

        {/* NOMBRE */}

        <h5 className="fw-bold">

          {product.name}

        </h5>

        {/* DESCRIPCIÓN */}

        <p className="text-muted small flex-grow-1">

          {
            product.description ||
            "Producto tecnológico disponible en TechNova Store."
          }

        </p>

        {/* BADGES */}

        <div className="mb-2">

          {
            product.discount > 0 && (

              <span className="badge bg-success me-2">

                -{product.discount}%

              </span>

            )
          }

          {
            price > 3000 && (

              <span className="badge bg-danger">

                🔥 Top

              </span>

            )
          }

        </div>

        {/* PRECIOS */}

        <div className="mb-3">

          {
            hasOffer ? (

              <>

                <span className="text-danger fw-bold fs-5">

                  S/ {offerPrice.toFixed(2)}

                </span>

                <small className="text-muted text-decoration-line-through ms-2">

                  S/ {price.toFixed(2)}

                </small>

              </>

            ) : (

              <span className="fw-bold fs-5">

                S/ {price.toFixed(2)}

              </span>

            )
          }

        </div>

        {/* STOCK */}

        <p
          className={
            stock > 5
              ? "text-success fw-bold"
              : stock > 0
                ? "text-warning fw-bold"
                : "text-danger fw-bold"
          }
        >

          {
            stock > 5
              ? "✅ Disponible"
              : stock > 0
                ? `⚠️ Últimas ${stock} unidades`
                : "❌ Agotado"
          }

        </p>

        {/* BOTÓN */}

        <button
          className="btn btn-primary w-100 rounded-pill mt-auto"
          onClick={() => addToCart(product)}
          disabled={stock === 0}
        >

          {
            stock === 0
              ? "Sin stock"
              : "Agregar al carrito"
          }

        </button>

      </div>

    </div>

  );
}

export default ProductCard;