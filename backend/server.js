const app = require("./app");
const cors = require('cors')
const mongoose = require("mongoose")
require("dotenv").config();
const connect = require("./config/dbConn");
const port = process.env.PORT || 5000

// Connecting to mongo db
connect()

app.use(cors())
// when mongoose is connected
mongoose.connection.once("open", () => {
    console.log("Mongo DB connected");
    app.listen(port, () => console.log("App is running on", port));
  });
  
//   when mongoose throws an error
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
  