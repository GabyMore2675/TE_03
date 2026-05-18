import {
  createContext,
  useState,
  useEffect
} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  // =========================================
  // CARGAR CARRITO DESDE LOCALSTORAGE
  // =========================================

  const [cart, setCart] = useState(() => {

    try {

      const saved =
        localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];

    } catch (error) {

      console.error(
        "Error cargando carrito:",
        error
      );

      return [];
    }

  });

  // =========================================
  // MENSAJE GLOBAL
  // =========================================

  const [msg, setMsg] = useState("");

  // =========================================
  // AGREGAR AL CARRITO
  // =========================================

  const addToCart = (product) => {

    if (!product) return;

    setCart((prevCart) => {

      const exist = prevCart.find(
        (p) => p.id === product.id
      );

      // ===============================
      // VALIDAR STOCK
      // ===============================

      if (product.stock <= 0) {

        setMsg("❌ Producto sin stock");

        setTimeout(() => {
          setMsg("");
        }, 2000);

        return prevCart;
      }

      // ===============================
      // SI YA EXISTE
      // ===============================

      if (exist) {

        const currentQty =
          exist.qty || 1;

        // máximo 3
        if (currentQty >= 3) {

          setMsg(
            "⚠️ Máximo 3 unidades por compra"
          );

          setTimeout(() => {
            setMsg("");
          }, 2000);

          return prevCart;
        }

        // validar stock real
        if (currentQty >= product.stock) {

          setMsg(
            "⚠️ No hay suficiente stock"
          );

          setTimeout(() => {
            setMsg("");
          }, 2000);

          return prevCart;
        }

        const updatedCart =
          prevCart.map((p) =>

            p.id === product.id
              ? {
                  ...p,
                  qty: currentQty + 1
                }
              : p
          );

        setMsg(
          `Producto "${product.name}" agregado ✔`
        );

        setTimeout(() => {
          setMsg("");
        }, 2000);

        return updatedCart;
      }

      // ===============================
      // NUEVO PRODUCTO
      // ===============================

      const newCart = [
        ...prevCart,
        {
          ...product,
          qty: 1
        }
      ];

      setMsg(
        `Producto "${product.name}" agregado ✔`
      );

      setTimeout(() => {
        setMsg("");
      }, 2000);

      return newCart;
    });
  };

  // =========================================
  // ELIMINAR PRODUCTO
  // =========================================

  const removeFromCart = (id) => {

    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );

    setMsg("🗑️ Producto eliminado");

    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  // =========================================
  // ACTUALIZAR CANTIDAD
  // =========================================

  const updateQty = (id, qty) => {

    if (qty < 1) return;

    setCart((prevCart) =>

      prevCart.map((item) => {

        if (item.id !== id) {
          return item;
        }

        // límite máximo 3
        if (qty > 3) {
          qty = 3;
        }

        // validar stock
        if (qty > item.stock) {
          qty = item.stock;
        }

        return {
          ...item,
          qty
        };
      })
    );
  };

  // =========================================
  // LIMPIAR CARRITO
  // =========================================

  const clearCart = () => {

    setCart([]);

    setMsg("🛒 Carrito vaciado");

    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  // =========================================
  // GUARDAR EN LOCALSTORAGE
  // =========================================

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // =========================================
  // PROVIDER
  // =========================================

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        setCart,
        msg
      }}
    >
      {children}
    </CartContext.Provider>
  );
}