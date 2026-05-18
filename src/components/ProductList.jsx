import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import ProductCard from "./ProductCard";

function ProductList() {

  // =========================================
  // STATES
  // =========================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // CARGAR PRODUCTOS MYSQL
  // =========================================

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res =
        await axios.get(
          "http://localhost:3001/api/products"
        );

      setProducts(res.data);

    } catch (error) {

      console.error(
        "Error cargando productos:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="text-center py-5">

        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Cargando productos...
        </p>

      </div>

    );

  }

  // =========================================
  // SIN PRODUCTOS
  // =========================================

  if (products.length === 0) {

    return (

      <div className="alert alert-warning mt-4">

        ⚠️ No existen productos registrados.

      </div>

    );

  }

  return (

    <div className="row g-4">

      {
        products.map((product) => (

          <div
            key={product.id}
            className="col-md-4 col-lg-3"
          >

            <ProductCard
              product={product}
            />

          </div>

        ))
      }

    </div>

  );
}

export default ProductList;