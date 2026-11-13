require("dotenv").config();

const express = require("express");

const app = express();

// Import Routes
const coreRoutes = require("./routes/coreRoutes");

// Middleware
app.use(express.json());

// Base Health Check
app.get("/", (req, res) => {
    res.send("CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM API is running");
});

// Register Feature Routes
app.use("/api/auth", coreRoutes);

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
    console.log('Server running at http://localhost:${PORT}');
});