const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const DATABASE_URL = process.env.DATABASE_URL;
const SERVER_PORT = process.env.SERVER_PORT;

console.log(DATABASE_URL);
console.log(SERVER_PORT);

const filesRouter = require("./routes/files");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/files", filesRouter);

const MONGO_URI = DATABASE_URL || "mongodb://127.0.0.1:27017/filemanager";
mongoose;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
