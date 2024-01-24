const express = require("express");
const app = express();
const connectDB = require("./config/db");
var cors = require("cors");
var PORT = process.env.PORT || 5000;
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.listen(PORT, () => {
  console.log("Server Running ");
});
