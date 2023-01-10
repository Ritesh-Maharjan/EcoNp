const express = require("express");
const {
  createUser,
  loginUser,
  resetPassword,
  changeForgetPassword,
  getUser,
  updateUserPassword,
  updateUser,
  deleteUser,
} = require("../controller/user");
const { isAuthenticatedUser } = require("../midlleware/auth");
const router = express.Router();

router
  .all("")
  .post("/registration", createUser)
  .post("/login", loginUser)
  .post("/forgotpassword", resetPassword)
  .get("/me", isAuthenticatedUser, getUser)
  .put("/me/update/", isAuthenticatedUser, updateUser)
  .put("/me/update/password", isAuthenticatedUser, updateUserPassword)
  .delete("/delete", isAuthenticatedUser, deleteUser)
  .put("/password/reset/:token", changeForgetPassword);

module.exports = router;
