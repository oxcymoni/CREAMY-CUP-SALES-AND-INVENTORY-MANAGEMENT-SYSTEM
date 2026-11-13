const express = require("express");
const router = express.Router();

const ReportController = require("../controllers/reportController");

router.get("/reports/sales", ReportController.getSalesReport);

router.get("/reports/purchases", ReportController.getPurchaseReport);

router.get("/reports/inventory", ReportController.getInventoryReport);

router.get("/reports/low-stock", ReportController.getLowStockReport);

router.get("/reports/stock-alerts", ReportController.getStockAlertsReport);

router.get("/reports/payments", ReportController.getPaymentsReport);

module.exports = router;
