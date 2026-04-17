import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ UN SOLO useContext ARRIBA
  const { addToCart, cart } = useContext(CartContext);

  const [msg, setMsg] = useState("");
  const [mainImg, setMainImg] = useState("");

  // ✅ USAR LOCALSTORAGE
  const storedProducts =
    JSON.parse(localStorage.getItem("products")) || products;

  const product = storedProducts.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) setMainImg(product.img);
  }, [product]);

  // ✅ VALIDACIÓN DESPUÉS DE LOS HOOKS
  if (!product) return <p>Producto no encontrado</p>;

  const currentItem = cart.find(p => p.id === product.id);
  const reachedLimit = currentItem && currentItem.qty >= 3;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <div className="row">
        <div className="col-md-6">
          <img src={mainImg} className="img-fluid" alt={product.name} />

          <div className="d-flex gap-2 mt-3">
            <img
              src={product.img}
              width="80"
              onClick={() => setMainImg(product.img)}
              style={{ cursor: "pointer" }}
              alt=""
            />

            {product.img2 && (
              <img
                src={product.img2}
                width="80"
                onClick={() => setMainImg(product.img2)}
                style={{ cursor: "pointer" }}
                alt=""
              />
            )}
          </div>
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>

          {product.discount && (
            <span className="badge bg-success me-2">
              Oferta -{product.discount}%
            </span>
          )}

          {product.price > 3000 && (
            <span className="badge bg-danger mb-2">🔥 Más vendido</span>
          )}

          <p>{product.desc}</p>

          <h4 className="mt-3">
            {product.offerPrice ? (
              <>
                <span className="text-danger fw-bold">
                  S/ {product.offerPrice}
                </span>{" "}
                <small className="text-muted text-decoration-line-through">
                  S/ {product.price}
                </small>
              </>
            ) : (
              <>S/ {product.price}</>
            )}
          </h4>

          <p className={product.stock > 5 ? "text-success" : "text-danger"}>
            {product.stock > 5 ? "En stock" : "Últimas unidades"}
          </p>

          <h5 className="mt-3">Características:</h5>
          <ul>
            {product.specs?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p><strong>Marca:</strong> {product.brand}</p>
          <p><strong>Stock disponible:</strong> {product.stock}</p>

          <p className={product.stock <= 3 ? "text-danger fw-bold" : "text-muted"}>
            {product.stock <= 3
              ? `⚠️ Últimas ${product.stock} unidades disponibles`
              : `Disponible: ${product.stock} unidades`}
          </p>

          <button
            className="btn btn-primary"
            disabled={product.stock === 0 || reachedLimit}
            onClick={() => {
              if (product.stock <= 0) return;

              if (reachedLimit) {
                setMsg("Máximo 3 unidades por compra ⚠️");
                return;
              }

              addToCart(product);
              setMsg("Producto agregado ✔");
              setTimeout(() => setMsg(""), 2000);
            }}
          >
            {product.stock === 0
              ? "Sin stock"
              : reachedLimit
                ? "Máximo alcanzado (3)"
                : "Agregar al carrito"}
          </button>

          {msg && <p className="text-success mt-2">{msg}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;