import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import ToastMessage from "./components/ToastMessage"; 
import LibroReclamaciones from "./pages/LibroReclamaciones"; 
import Footer from "./components/Footer"; 
import { products } from "./data/products";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (!stored) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:categoria" element={<Category />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/reclamaciones" element={<LibroReclamaciones />} />
        </Routes>
        <Footer /> 
        <ToastMessage />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;