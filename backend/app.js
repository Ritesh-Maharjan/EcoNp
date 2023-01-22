const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const ErrorHandler = require("./midlleware/error");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

// route imports
const product = require("./route/product");
const user = require("./route/user");
const order = require("./route/order");

// using routes
app.use("/api/product/", product);
app.use("/api/user/", user);
app.use("/api/order/", order);

app.use(ErrorHandler);

module.exports = app;
