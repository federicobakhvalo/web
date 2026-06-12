const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.SERVER_PORT;
const DATABASE_URL = process.env.DATABASE_URL;
console.log(`Server is running on port ${PORT}`);
console.log("Database url : ", DATABASE_URL);

const userRouter = require("./routes/user-router.js");
const pageRouter = require("./routes/page-router.js");

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));
// console.log("View engine : ", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/", pageRouter);

async function startServer() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
