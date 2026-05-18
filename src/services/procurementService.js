import axios from "axios";

// ========================================
// URL BASE API
// ========================================

const API_URL =
  "http://localhost:3001/api";

// ========================================
// CALCULAR SCORE INTELIGENTE
// ========================================

const calculateScore = (
  price,
  rating,
  deliveryTime
) => {

  return (
    Number(price) -
    Number(rating) * 50 +
    Number(deliveryTime) * 10
  );

};

// ========================================
// RECOMENDAR MEJOR PROVEEDOR
// ========================================

export const recommendSupplier = async (
  product
) => {

  try {

    // ===============================
    // OBTENER PROVEEDORES MYSQL
    // ===============================

    const res = await axios.get(
      `${API_URL}/suppliers`
    );

    const suppliers = res.data;

    // ===============================
    // FILTRAR POR CATEGORÍA
    // ===============================

    const categorySuppliers =
      suppliers.filter(
        (s) =>
          s.category?.toLowerCase() ===
          product.category?.toLowerCase()
      );

    if (categorySuppliers.length === 0) {
      return null;
    }

    let bestSupplier = null;

    let bestScore = Infinity;

    // ===============================
    // EVALUAR PROVEEDORES
    // ===============================

    categorySuppliers.forEach(
      (supplier) => {

        const supplierPrice =
          Number(supplier.price || 0);

        if (supplierPrice <= 0) return;

        const score =
          calculateScore(
            supplierPrice,
            supplier.rating,
            supplier.delivery_time
          );

        if (score < bestScore) {

          bestScore = score;

          bestSupplier = {
            ...supplier,
            score
          };

        }

      }
    );

    return bestSupplier;

  } catch (error) {

    console.error(
      "Error recomendando proveedor:",
      error
    );

    return null;

  }

};

// ========================================
// DETECTAR STOCK CRÍTICO
// ========================================

export const getCriticalStockProducts =
  async () => {

    try {

      const res = await axios.get(
        `${API_URL}/products`
      );

      const products = res.data;

      return products.filter(
        (p) => Number(p.stock) <= 5
      );

    } catch (error) {

      console.error(
        "Error obteniendo productos:",
        error
      );

      return [];

    }

  };

// ========================================
// GENERAR ORDEN DE COMPRA
// ========================================

export const generatePurchaseOrder =
  async (
    product,
    supplier,
    quantity = 10
  ) => {

    try {

      const unitPrice =
        Number(supplier.price || 0);

      const total =
        unitPrice * quantity;

      const order = {

        orderId:
          "OC-" +
          Math.floor(
            Math.random() * 100000
          ),

        date:
          new Date().toLocaleDateString(
            "es-PE"
          ),

        supplier:
          supplier.name,

        supplierId:
          supplier.id,

        supplierContact:
          supplier.contact ||
          "No disponible",

        supplierLocation:
          supplier.location ||
          "No disponible",

        product:
          product.name,

        productId:
          product.id,

        category:
          product.category,

        quantity,

        unitPrice,

        total:
          Number(
            total.toFixed(2)
          ),

        deliveryTime:
          supplier.delivery_time,

        status:
          "Pendiente"

      };

      // ===============================
      // GUARDAR EN MYSQL
      // ===============================

      await axios.post(
        `${API_URL}/purchase-orders`,
        order
      );

      return order;

    } catch (error) {

      console.error(
        "Error generando orden:",
        error
      );

      return null;

    }

  };

// ========================================
// EVALUAR PROVEEDORES
// ========================================

export const evaluateSuppliers =
  async (product) => {

    try {

      const res = await axios.get(
        `${API_URL}/suppliers`
      );

      const suppliers = res.data;

      const categorySuppliers =
        suppliers.filter(
          (s) =>
            s.category?.toLowerCase() ===
            product.category?.toLowerCase()
        );

      const evaluatedSuppliers =
        categorySuppliers.map(
          (supplier) => {

            const price =
              Number(
                supplier.price || 0
              );

            const rating =
              Number(
                supplier.rating || 0
              );

            const deliveryTime =
              Number(
                supplier.delivery_time || 0
              );

            const score =
              calculateScore(
                price,
                rating,
                deliveryTime
              );

            return {

              id:
                supplier.id,

              name:
                supplier.name,

              category:
                supplier.category,

              price,

              rating,

              deliveryTime,

              score:
                Number(
                  score.toFixed(2)
                )

            };

          }
        );

      // ===============================
      // ORDENAR MEJORES PRIMERO
      // ===============================

      evaluatedSuppliers.sort(
        (a, b) =>
          a.score - b.score
      );

      return evaluatedSuppliers;

    } catch (error) {

      console.error(
        "Error evaluando proveedores:",
        error
      );

      return [];

    }

  };