const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportController");
const UniqueFeatureControllers = require("../controllers/uniquefeatureControllers");

router.get("/reports/sales", ReportController.getSalesReport);
router.get("/reports/purchases", ReportController.getPurchaseReport);
router.get("/reports/rentals", ReportController.getRentalReport);
router.get("/reports/payments", ReportController.getPaymentsReport);

router.get("/reports/low-stock", UniqueFeatureControllers.getLowStock);
router.get("/reports/stock-alerts", UniqueFeatureControllers.getStockAlerts);

module.exports = router;
