const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

// INVENTORY ROUTES
router.get("/inventory", Controller.getInventory);
router.get("/inventory/:id", Controller.getInventoryById);
router.post("/inventory", Controller.addInventory);
router.put("/inventory/:id", Controller.updateInventory);
router.delete("/inventory/:id", Controller.deleteInventory);

// PRODUCT INGREDIENTS ROUTES
router.get("/product-ingredients", Controller.getProductIngredients);
router.get("/product-ingredients/:id", Controller.getProductIngredientById);
router.post("/product-ingredients", Controller.addProductIngredient);
router.put("/product-ingredients/:id", Controller.updateProductIngredient);
router.delete("/product-ingredients/:id", Controller.deleteProductIngredient);

// STOCK MOVEMENTS ROUTES
router.get("/stock-movements", Controller.getStockMovements);
router.get("/stock-movements/:id", Controller.getStockMovementById);
router.post("/stock-movements", Controller.addStockMovement);
router.put("/stock-movements/:id", Controller.updateStockMovement);
router.delete("/stock-movements/:id", Controller.deleteStockMovement);

module.exports = router;
