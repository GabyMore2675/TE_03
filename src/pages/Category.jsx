import {
  useParams,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import ProductCard
  from "../components/ProductCard";

import {
  getProducts
} from "../services/apiService";

function Category() {

  const { categoria } =
    useParams();

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // SEARCH PARAM
  // =========================

  const query =
    new URLSearchParams(
      location.search
    );

  const search =
    query.get("search");

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {

    cargarProductos();

  }, []);

  const cargarProductos =
    async () => {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  // =========================
  // FILTERS
  // =========================

  let filtered = products;

  // CATEGORY FILTER
  if (
    categoria &&
    categoria !== "all"
  ) {

    filtered = filtered.filter(
      (p) =>
        p.category === categoria
    );
  }

  // SEARCH FILTER
  if (search) {

    filtered = filtered.filter(
      (p) =>
        p.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="container mt-5 text-center">

        <h4>
          Cargando productos...
        </h4>

      </div>

    );
  }

  return (

    <div className="container mt-4">

      {/* BACK BUTTON */}

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ⬅ Volver
      </button>

      {/* TITLE */}

      <h2 className="mb-4">

        {
          search
            ? `Resultados para "${search}"`
            : categoria === "all"
              ? "Todos los productos"
              : categoria?.toUpperCase()
        }

      </h2>

      {/* PRODUCTS */}

      <div className="row">

        {
          filtered.map((p) => (

            <div
              className="col-md-4 mb-4"
              key={p.id}
            >

              <ProductCard
                product={p}
              />

            </div>

          ))
        }

      </div>

      {/* EMPTY */}

      {
        filtered.length === 0 && (

          <div className="text-center mt-5">

            <h5>
              No se encontraron productos
            </h5>

          </div>

        )
      }

    </div>

  );
}

export default Category;