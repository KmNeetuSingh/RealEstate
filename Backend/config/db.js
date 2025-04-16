// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  return mongoose.connect(process.env.MONGO_URI)    
    console.log("🔍 MONGO_URI =", process.env.MONGO_URI);
};

module.exports = connection;
