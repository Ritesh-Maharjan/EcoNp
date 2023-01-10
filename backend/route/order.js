const express = require("express");
const {
  createOrder,
  getAllOrder,
  getOrder,
  getAllOrderAdmin,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/order");
const { isAuthenticatedUser, isAdmin } = require("../midlleware/auth");
const router = express.Router();

router
  .all("")
  .get("/", isAuthenticatedUser, getAllOrder)
  .get("/admin", isAuthenticatedUser, isAdmin("admin"), getAllOrderAdmin)
  .get("/:id", isAuthenticatedUser, getOrder)
  .post("/new", isAuthenticatedUser, createOrder)
  .put(
    "/updatestatus/:id",
    isAuthenticatedUser,
    isAdmin("admin"),
    updateOrderStatus
  )
  .delete("/:id", isAuthenticatedUser, isAdmin("admin"), deleteOrder);

module.exports = router;
