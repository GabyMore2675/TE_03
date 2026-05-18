import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import LibroReclamaciones from "./pages/LibroReclamaciones";
import Procurement from "./pages/Procurement";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastMessage from "./components/ToastMessage";
import ProcurementChatbot from "./components/ProcurementChatbot";

import { CartProvider } from "./context/CartContext";

// =========================================
// APP
// =========================================

function App() {

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // INICIALIZAR LOCAL STORAGE
  // =========================================

  useEffect(() => {

    const initializeDatabase = async () => {

      try {

        // =============================
        // PRODUCTOS
        // =============================

        const productsStored =
          localStorage.getItem("products");

        if (!productsStored) {

          const productsResponse =
            await fetch(
              "http://localhost:5000/api/products"
            );

          const productsData =
            await productsResponse.json();

          localStorage.setItem(
            "products",
            JSON.stringify(productsData)
          );

        }

        // =============================
        // PROVEEDORES
        // =============================

        const suppliersStored =
          localStorage.getItem("suppliers");

        if (!suppliersStored) {

          const suppliersResponse =
            await fetch(
              "http://localhost:5000/api/suppliers"
            );

          const suppliersData =
            await suppliersResponse.json();

          localStorage.setItem(
            "suppliers",
            JSON.stringify(suppliersData)
          );

        }

      } catch (error) {

        console.error(
          "Error inicializando datos:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    initializeDatabase();

  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div
        className="
          d-flex
          justify-content-center
          align-items-center
        "
        style={{
          height: "100vh",
          background: "#f8fafc"
        }}
      >

        <div className="text-center">

          <div
            className="
              spinner-border
              text-primary
              mb-3
            "
            role="status"
            style={{
              width: "4rem",
              height: "4rem"
            }}
          />

          <h4 className="fw-bold">
            Cargando TechNova...
          </h4>

          <p className="text-muted">
            Inicializando sistema inteligente
          </p>

        </div>

      </div>

    );

  }

  // =========================================
  // APP
  // =========================================

  return (

    <CartProvider>

      <BrowserRouter>

        {/* NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/productos"
            element={<Products />}
          />

          <Route
            path="/productos/:categoria"
            element={<Category />}
          />

          <Route
            path="/producto/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/reclamaciones"
            element={<LibroReclamaciones />}
          />

          <Route
            path="/procurement"
            element={<Procurement />}
          />

        </Routes>

        {/* COMPONENTES GLOBALES */}
        <ToastMessage />

        <ProcurementChatbot />

        <Footer />

      </BrowserRouter>

    </CartProvider>

  );
}

export default App;