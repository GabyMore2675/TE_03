const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// ============================
// ROUTES
// ============================

const productsRoutes =
  require("./routes/products");

const suppliersRoutes =
  require("./routes/suppliers");

app.use(
  "/api/products",
  productsRoutes
);

app.use(
  "/api/suppliers",
  suppliersRoutes
);

// ============================
// SERVER
// ============================
app.put("/api/products/:id", async (req, res) => {
  try {
    const { stock } = req.body;

    await db.query(
      "UPDATE products SET stock = ? WHERE id = ?",
      [stock, req.params.id]
    );

    res.json({
      message: "Stock actualizado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error actualizando stock",
    });
  }
});

app.listen(5000, () => {

  console.log(
    "🚀 Backend corriendo en puerto 5000"
  );

});
