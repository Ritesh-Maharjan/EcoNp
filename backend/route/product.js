const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  productReview,
  getAllProductReview,
  deleteReview,
} = require("../controller/product");
const { isAuthenticatedUser, isAdmin } = require("../midlleware/auth");
const router = express.Router();

router
  .all("")
  .get("/", getAllProducts)
  .get("/reviews/:id", getAllProductReview)
  .get("/:id", getProductById)
  .put("/review", isAuthenticatedUser, productReview)
  .put("/:id", isAuthenticatedUser, isAdmin("admin"), updateProduct)
  .post("/", isAuthenticatedUser, isAdmin("admin"), createProduct)
  .delete("/reviews/:id", isAuthenticatedUser, deleteReview)
  .delete("/:id", isAuthenticatedUser, isAdmin("admin"), deleteProduct);

module.exports = router;
