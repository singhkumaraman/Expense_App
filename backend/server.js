const express = require("express");
const app = express();
const connectDB = require("./config/db");
var cors = require("cors");
require("dotenv").config();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("Server Running ");
});
