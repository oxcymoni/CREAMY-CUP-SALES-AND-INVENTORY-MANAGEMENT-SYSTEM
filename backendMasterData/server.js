const express = require("express");

const app = express();

// Import Routes
const reportRoutes = require("./routes/reportRoutes");
const masterDataRoutes = require("./routes/masterdataRoutes");

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Base Route / Health Check
app.get("/", (req, res) => {
  res.send("CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM API is running");
});

// Register Feature Routes
app.use("/", reportRoutes);
app.use("/api/master-data", masterDataRoutes);

// Server Configuration
const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
