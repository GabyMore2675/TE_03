import { getSuppliers } from "./apiService";

// ========================================
// RESPUESTAS CONVERSACIONALES
// ========================================

const normalResponses = {
  hola:
    "Hola 👋 Soy el asistente inteligente de TechNova Procurement. Puedo ayudarte con compras, proveedores y automatización de órdenes.",

  ayuda:
    "Puedo ayudarte con:\n\n• Solicitudes de compra\n• Recomendación de proveedores\n• Comparación de productos\n• Generación de órdenes\n• Consultas inteligentes\n\n📌 Ejemplos:\n• Necesito 5 laptops Lenovo\n• Comprar smartphones Samsung\n• Recomiéndame proveedores de accesorios",

  gracias:
    "Con gusto 😊 Estoy aquí para ayudarte.",

  adios:
    "Hasta luego 👋 Que tengas un excelente día.",

  "quien eres":
    "Soy el asistente IA de TechNova especializado en automatización Procure-to-Pay y gestión inteligente de compras.",

  "qué haces":
    "Automatizo solicitudes de compra, clasificación de productos, recomendación de proveedores y generación de órdenes inteligentes.",

  proveedor:
    "Puedo recomendarte proveedores según categoría, precio, stock y tiempo de entrega.",

  orden:
    "Puedo ayudarte a generar órdenes de compra automáticamente."
};

// ========================================
// DETECTAR CONVERSACIÓN NORMAL
// ========================================

export const detectNormalConversation = (
  message
) => {

  if (!message) return null;

  const text = message
    .toLowerCase()
    .trim();

  for (const key in normalResponses) {

    if (text.includes(key)) {

      return normalResponses[key];

    }
  }

  return null;
};

// ========================================
// INTERPRETAR SOLICITUD IA
// ========================================

export const interpretPurchaseRequest = async (
  text
) => {

  if (!text) return null;

  const lower = text.toLowerCase();

  // ====================================
  // DETECTAR CATEGORÍA
  // ====================================

  let category = "accesorios";

  // LAPTOPS
  if (
    lower.includes("laptop") ||
    lower.includes("notebook") ||
    lower.includes("lenovo") ||
    lower.includes("hp") ||
    lower.includes("dell") ||
    lower.includes("asus") ||
    lower.includes("acer") ||
    lower.includes("macbook")
  ) {
    category = "laptops";
  }

  // SMARTPHONES
  else if (
    lower.includes("smartphone") ||
    lower.includes("iphone") ||
    lower.includes("samsung") ||
    lower.includes("xiaomi") ||
    lower.includes("celular") ||
    lower.includes("telefono") ||
    lower.includes("móvil")
  ) {
    category = "smartphones";
  }

  // ACCESORIOS
  else if (
    lower.includes("mouse") ||
    lower.includes("teclado") ||
    lower.includes("audifonos") ||
    lower.includes("auriculares") ||
    lower.includes("cargador") ||
    lower.includes("monitor") ||
    lower.includes("webcam")
  ) {
    category = "accesorios";
  }

  // ====================================
  // DETECTAR CANTIDAD
  // ====================================

  const qtyMatch = lower.match(/\d+/);

  const quantity =
    qtyMatch
      ? parseInt(qtyMatch[0])
      : 1;

  // ====================================
  // DETECTAR PRIORIDAD
  // ====================================

  let priority = "normal";

  if (
    lower.includes("urgente") ||
    lower.includes("rápido") ||
    lower.includes("inmediato") ||
    lower.includes("express")
  ) {
    priority = "alta";
  }

  // ====================================
  // DETECTAR MARCA
  // ====================================

  let brand = "";

  const brands = [
    "lenovo",
    "hp",
    "dell",
    "asus",
    "acer",
    "apple",
    "samsung",
    "xiaomi",
    "logitech",
    "razer"
  ];

  brands.forEach((b) => {

    if (lower.includes(b)) {

      brand =
        b.charAt(0).toUpperCase() +
        b.slice(1);

    }

  });

  return {
    category,
    quantity,
    priority,
    brand,
    originalText: text
  };
};

// ========================================
// RECOMENDAR PROVEEDOR IA DESDE MYSQL
// ========================================

export const aiRecommendSupplier = async (
  category
) => {

  try {

    // OBTENER PROVEEDORES DESDE MYSQL
    const suppliers =
      await getSuppliers();

    // FILTRAR POR CATEGORÍA
    const filtered =
      suppliers.filter(
        (s) =>
          s.category?.toLowerCase() ===
          category.toLowerCase()
      );

    // SI NO HAY PROVEEDORES
    if (!filtered.length) {

      return {
        id: 0,
        name: "Proveedor Genérico",
        rating: 4.0,
        delivery: "5 días",
        ruc: "00000000000",
        category
      };

    }

    // ORDENAR POR RATING
    filtered.sort(
      (a, b) =>
        Number(b.rating) -
        Number(a.rating)
    );

    // DEVOLVER MEJOR
    return filtered[0];

  } catch (error) {

    console.error(
      "Error obteniendo proveedores:",
      error
    );

    return {
      id: 0,
      name: "Proveedor Temporal",
      rating: 4.0,
      delivery: "5 días",
      ruc: "00000000000",
      category
    };

  }

};

// ========================================
// GENERAR RESPUESTA IA
// ========================================

export const generateAIResponse = async (
  data
) => {

  return {

    status: "approved",

    procurement_type:
      data.category,

    quantity:
      data.quantity,

    priority:
      data.priority,

    brand:
      data.brand || "No especificada",

    supplier:
      data.proveedor?.name ||
      "Proveedor recomendado",

    supplier_rating:
      data.proveedor?.rating || 4.5,

    estimated_delivery:
      data.proveedor?.delivery ||
      "3 días",

    workflow:
      "Procure-to-Pay Automated",

    generated_at:
      new Date().toLocaleString("es-PE"),

    ai_confidence:
      "98%",

    recommendation:
      `Se recomienda adquirir ${data.quantity} unidad(es) de la categoría ${data.category} mediante el proveedor seleccionado.`,

    automation:
      "Solicitud procesada automáticamente mediante IA"
  };
};