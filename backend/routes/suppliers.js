const express = require("express");

const router = express.Router();

const db = require("../db");

// ============================
// GET ALL SUPPLIERS
// ============================

router.get("/", (req, res) => {

  const sql = `
    SELECT *
    FROM suppliers
  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.log(err);

      return res
        .status(500)
        .json(err);

    }

    res.json(results);

  });

});

module.exports = router;