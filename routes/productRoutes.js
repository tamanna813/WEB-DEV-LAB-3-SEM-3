const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  adjustStock,
  getLowStockProducts,
  getInventorySummary
} = require("../controllers/productController");

const router = express.Router();

// Specific routes must be placed before /:id
router.get("/low-stock", getLowStockProducts);
router.get("/summary", getInventorySummary);

router.route("/")
  .post(createProduct)
  .get(getProducts);

router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.patch("/:id/stock", adjustStock);

module.exports = router;