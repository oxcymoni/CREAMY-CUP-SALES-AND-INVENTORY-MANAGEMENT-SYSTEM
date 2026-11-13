const express = require("express");
const router = express.Router();
const Controller = require("../controllers/salesControllers");

// SALES
router.get("/sales", Controller.getSales);
router.get("/sales/:id", Controller.getSaleById);
router.post("/sales", Controller.addSale);
router.put("/sales/:id", Controller.updateSale);
router.delete("/sales/:id", Controller.deleteSale);

// RENTAL LOGS 
router.get("/rental-logs", Controller.getRentalLogs);
router.get("/rental-logs/:id", Controller.getRentalLogById);

// STOCK MOVEMENTS
router.get("/stock-movements", Controller.getStockMovements);
router.get("/stock-movements/:id", Controller.getStockMovementById);
router.post("/stock-movements", Controller.addStockMovement);
router.put("/stock-movements/:id", Controller.updateStockMovement);
router.delete("/stock-movements/:id", Controller.deleteStockMovement);

// PURCHASE HISTORY
router.get("/purchase-history", Controller.getPurchaseHistory);
router.get("/purchase-history/:id", Controller.getPurchaseHistoryById);
router.post("/purchase-history", Controller.addPurchaseHistory);
router.put("/purchase-history/:id", Controller.updatePurchaseHistory);
router.delete("/purchase-history/:id", Controller.deletePurchaseHistory);

module.exports = router;