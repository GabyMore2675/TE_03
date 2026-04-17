import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card shadow-sm h-100">
      <Link to={`/producto/${product.id}`}>
        <img src={product.img} className="card-img-top" alt={product.name} />
      </Link>

      <div className="card-body">
        <h5>{product.name}</h5>
        <p>{product.desc}</p>

        {product.discount && <span className="badge bg-success">-{product.discount}%</span>}

        <h5>
          {product.offerPrice ? (
            <>
              <span className="text-danger fw-bold">S/ {product.offerPrice}</span>{" "}
              <small className="text-muted text-decoration-line-through">
                S/ {product.price}
              </small>
            </>
          ) : (
            <>S/ {product.price}</>
          )}
        </h5>

        <p className={product.stock > 5 ? "text-success" : "text-danger"}>
          {product.stock > 5
            ? "✅ Disponible"
            : product.stock > 0
              ? "⚠️ Últimas unidades"
              : "❌ Agotado"}
        </p>

        <button
          className="btn btn-primary w-100"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;