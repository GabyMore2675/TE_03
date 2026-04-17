import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [msg, setMsg] = useState(""); // 👈 mensaje global tipo toast

  const addToCart = (product) => {
    const exist = cart.find(p => p.id === product.id);

    if (exist) {
      if ((exist.qty || 1) >= 3) {
        setMsg("⚠️ Máximo 3 unidades por compra");
        setTimeout(() => setMsg(""), 2000);
        return;
      }

      if ((exist.qty || 1) >= product.stock) {
        setMsg("⚠️ No hay suficiente stock");
        setTimeout(() => setMsg(""), 2000);
        return;
      }

      setCart(cart.map(p =>
        p.id === product.id
          ? { ...p, qty: (p.qty || 1) + 1 }
          : p
      ));
    } else {
      if (product.stock <= 0) {
        setMsg("❌ Sin stock");
        setTimeout(() => setMsg(""), 2000);
        return;
      }

      setCart([...cart, { ...product, qty: 1 }]);
    }

    // 👇 mensaje de éxito al agregar
    setMsg(`Producto "${product.name}" agregado al carrito ✔`);
    setTimeout(() => setMsg(""), 2000);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQty = (index, qty) => {
    const newCart = [...cart];
    if (qty < 1 || qty > newCart[index].stock) return;
    newCart[index].qty = qty;
    setCart(newCart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, setCart, msg }}
    >
      {children}
    </CartContext.Provider>
  );
}