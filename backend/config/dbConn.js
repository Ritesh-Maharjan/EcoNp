const mongoose = require("mongoose");

console.log(process.env.MONGODB_CONNECTION)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("connected to mongo db ");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
