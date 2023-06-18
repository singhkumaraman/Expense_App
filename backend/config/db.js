const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aman:aman@cluster0.fuorplv.mongodb.net/",
      {}
    );
    console.log("Database Connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
