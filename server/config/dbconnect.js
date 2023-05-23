const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected!");
};

module.exports = connectDb;
