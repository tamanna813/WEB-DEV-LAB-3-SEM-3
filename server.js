require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Built-in middleware to read JSON request bodies
app.use(express.json());

// Basic welcome route
app.get("/", (req, res) => {
  res.json({ message: "Inventory Management API is running" });
});

// Product APIs
app.use("/api/products", productRoutes);

// Centralized error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Unable to start server:", error.message);
  process.exit(1);
});