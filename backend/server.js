const express = require("express");
const app = express();

const reportRoutes = require("./routes/reportRoutes");
const auditRoutes = require("./routes/auditRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM API is running");
});

app.use("/", reportRoutes);
app.use("/api", auditRoutes);

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});