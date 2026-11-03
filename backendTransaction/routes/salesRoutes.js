const express = require("express");
const router = express.Router();
const Controller = require("../controllers/salesControllers");

router.get("/sales", Controller.getSales);
router.get("/sales/:id", Controller.getSaleById);
router.post("/sales", Controller.addSale);
router.put("/sales/:id", Controller.updateSale);
router.delete("/sales/:id", Controller.deleteSale);

router.get("/rental-logs", Controller.getRentalLogs);
router.get("/rental-logs/:id", Controller.getRentalLogById);
router.post("/rental-logs", Controller.createRentalLog);
router.put("/rental-logs/:id", Controller.updateRentalLog);
router.delete("/rental-logs/:id", Controller.deleteRentalLog);

router.get("/stock-movements", Controller.getStockMovements);
router.post("/stock-movements", Controller.addStockMovement);

router.get("/purchase-history", Controller.getPurchaseHistory);

module.exports = router;
