import axios from "axios";

const API =
  "http://localhost:5000/api";

// ============================
// PRODUCTS
// ============================

export const getProducts = async () => {

  const response =
    await axios.get(
      `${API}/products`
    );

  return response.data;
};

// ============================
// SUPPLIERS
// ============================

export const getSuppliers =
  async () => {

    const response =
      await axios.get(
        `${API}/suppliers`
      );

    return response.data;
};