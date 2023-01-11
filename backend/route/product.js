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
const multipleUpload = require("../midlleware/multer");
const router = express.Router();

router
  .all("")
  .get("/", getAllProducts)
  .get("/reviews/:id", getAllProductReview)
  .get("/:id", getProductById)
  .put("/review", isAuthenticatedUser, productReview)
  .put("/:id", multipleUpload, isAuthenticatedUser, isAdmin("admin"), updateProduct)
  .post("/",multipleUpload, isAuthenticatedUser, isAdmin("admin"), createProduct)
  .delete("/reviews/:id", isAuthenticatedUser, deleteReview)
  .delete("/:id", isAuthenticatedUser, isAdmin("admin"), deleteProduct);

module.exports = router;
