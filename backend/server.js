const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const coreRoutes = require("./routes/coreRoutes");
const masterDataRoutes = require("./routes/masterdataRoutes");
const salesRoutes = require("./routes/salesRoutes");
const reportRoutes = require("./routes/reportRoutes");
const uniquefeatureRoutes = require("./routes/uniquefeatureRoutes");
const auditRoutes = require("./routes/auditRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM API is running");
});

app.use("/api/auth", coreRoutes);
app.use("/api/master-data", masterDataRoutes);
app.use("/api/transactions", salesRoutes);
app.use("/api", reportRoutes);
app.use("/api", uniquefeatureRoutes);
app.use("/api/audit", auditRoutes);

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
