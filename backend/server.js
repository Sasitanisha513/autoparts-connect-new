const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const vehicleRoutes = require("./routes/vehicle");
const partRoutes = require("./routes/part");
const orderRoutes = require("./routes/order");
const articleRoutes = require("./routes/article");
const reportRoutes = require("./routes/report");
const analyticsRoutes = require("./routes/analytics");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],

    credentials: true,
  })
);

app.use(express.json());
app.use(
  "/uploads",
  express.static("uploads")
);
// Allow frontend to access uploaded images
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/analytics", analyticsRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Auto Parts Backend Running...");
});

// MongoDB Connection
mongoose
.connect("mongodb://127.0.0.1:27017/autoparts_connect")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});