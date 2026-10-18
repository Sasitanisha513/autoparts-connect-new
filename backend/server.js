const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const vehicleRoutes = require("./routes/vehicle");
const partRoutes = require("./routes/part");
const orderRoutes = require("./routes/order");
const articleRoutes = require("./routes/article");
const reportRoutes = require("./routes/report");
const analyticsRoutes = require("./routes/analytics");
const chatbotRoutes = require("./routes/chatbot");
const partSourceRoutes =
  require("./routes/partSource");

// =====================================================
// APP
// =====================================================

const app = express();

// =====================================================
// CHECK SERVER DIRECTORY
// =====================================================

console.log(__dirname);

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());

// =====================================================
// SERVE UPLOADED IMAGES
// =====================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// =====================================================
// ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/vehicles",
  vehicleRoutes
);

app.use(
  "/api/parts",
  partRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/articles",
  articleRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);
app.use(
  "/api/chatbot",
  chatbotRoutes
);
app.use(
  "/api/part-sources",
  partSourceRoutes
);

// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.send(
    "Auto Parts Backend Running..."
  );
});

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/autoparts_connect"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// =====================================================
// START SERVER
// =====================================================

const PORT = 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);