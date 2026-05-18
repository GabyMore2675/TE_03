import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, cart } = useContext(CartContext);

  const [msg, setMsg] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ CARGAR PRODUCTO DESDE MYSQL
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3001/api/products/${id}`
      );

      setProduct(res.data);

      setMainImg(
        res.data.image_url ||
        "https://via.placeholder.com/500x500?text=Sin+Imagen"
      );

    } catch (error) {
      console.error("Error cargando producto:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOADING
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Cargando producto...</p>
      </div>
    );
  }

  // ✅ PRODUCTO NO ENCONTRADO
  if (!product) {
    return (
      <div className="container mt-5">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate(-1)}
        >
          ⬅ Volver
        </button>

        <div className="alert alert-danger">
          Producto no encontrado
        </div>
      </div>
    );
  }

  // ✅ VALIDAR LIMITE CARRITO
  const currentItem = cart.find((p) => p.id === product.id);

  const reachedLimit =
    currentItem && currentItem.qty >= 3;

  // ✅ PARSEAR SPECS SI VIENEN COMO TEXTO
  const specsArray =
    typeof product.specs === "string"
      ? product.specs.split(",")
      : [];

  return (
    <div className="container mt-5">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ⬅ Volver
      </button>

      <div className="row">

        {/* IMAGEN */}
        <div className="col-md-6">

          <div className="card shadow-sm p-3">
            <img
              src={mainImg}
              className="img-fluid rounded"
              alt={product.name}
              style={{
                maxHeight: "500px",
                objectFit: "contain"
              }}
            />
          </div>

          {/* MINIATURAS */}
          <div className="d-flex gap-2 mt-3">

            <img
              src={
                product.image_url ||
                "https://via.placeholder.com/100x100?text=No+Img"
              }
              width="80"
              height="80"
              onClick={() =>
                setMainImg(product.image_url)
              }
              style={{
                cursor: "pointer",
                objectFit: "contain",
                border: "1px solid #ddd",
                padding: "5px"
              }}
              alt=""
            />

          </div>
        </div>

        {/* INFO */}
        <div className="col-md-6">

          <h2 className="fw-bold">
            {product.name}
          </h2>

          {/* BADGES */}
          <div className="mb-2">

            {product.discount > 0 && (
              <span className="badge bg-success me-2">
                Oferta -{product.discount}%
              </span>
            )}

            {product.price > 3000 && (
              <span className="badge bg-danger">
                🔥 Más vendido
              </span>
            )}

          </div>

          {/* DESCRIPCIÓN */}
          <p className="text-muted">
            {product.description}
          </p>

          {/* PRECIOS */}
          <h3 className="mt-3">

            {product.offer_price ? (
              <>
                <span className="text-danger fw-bold">
                  S/ {product.offer_price}
                </span>

                <small className="text-muted text-decoration-line-through ms-2">
                  S/ {product.price}
                </small>
              </>
            ) : (
              <span className="fw-bold">
                S/ {product.price}
              </span>
            )}

          </h3>

          {/* STOCK */}
          <p
            className={
              product.stock > 5
                ? "text-success fw-bold"
                : "text-danger fw-bold"
            }
          >
            {product.stock > 5
              ? "✅ En stock"
              : `⚠️ Últimas ${product.stock} unidades`}
          </p>

          {/* DETALLES */}
          <div className="mt-4">

            <p>
              <strong>Marca:</strong> {product.brand}
            </p>

            <p>
              <strong>Categoría:</strong> {product.category}
            </p>

            <p>
              <strong>Stock disponible:</strong> {product.stock}
            </p>

          </div>

          {/* ESPECIFICACIONES */}
          <div className="mt-4">

            <h5>Características:</h5>

            <ul className="list-group">

              {specsArray.map((s, i) => (
                <li
                  key={i}
                  className="list-group-item"
                >
                  {s.trim()}
                </li>
              ))}

            </ul>

          </div>

          {/* BOTÓN */}
          <div className="mt-4">

            <button
              className="btn btn-primary btn-lg"
              disabled={
                product.stock === 0 ||
                reachedLimit
              }
              onClick={() => {

                if (product.stock <= 0) return;

                if (reachedLimit) {
                  setMsg(
                    "Máximo 3 unidades por compra ⚠️"
                  );

                  return;
                }

                addToCart(product);

                setMsg("Producto agregado ✔");

                setTimeout(() => {
                  setMsg("");
                }, 2000);

              }}
            >
              {product.stock === 0
                ? "Sin stock"
                : reachedLimit
                  ? "Máximo alcanzado (3)"
                  : "Agregar al carrito"}
            </button>

            {msg && (
              <p className="text-success mt-3 fw-bold">
                {msg}
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;