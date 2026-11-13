const express = require("express");

const app = express();

const reportRoutes = require("./routes/reportRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM API is running");
});

app.use("/api", reportRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
