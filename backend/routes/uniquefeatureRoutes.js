const express = require("express");
const router = express.Router();
const Controller = require("../controllers/uniquefeatureControllers");

router.get("/inventory", Controller.getInventory);
router.get("/inventory/:id", Controller.getInventoryById);
router.post("/inventory", Controller.addInventory);
router.put("/inventory/:id", Controller.updateInventory);
router.delete("/inventory/:id", Controller.deleteInventory);

router.get("/low-stock", Controller.getLowStock);
router.get("/stock-alerts", Controller.getStockAlerts);

router.get("/product-ingredients", Controller.getProductIngredients);
router.get("/product-ingredients/:id", Controller.getProductIngredientById);
router.post("/product-ingredients", Controller.addProductIngredient);
router.put("/product-ingredients/:id", Controller.updateProductIngredient);
router.delete("/product-ingredients/:id", Controller.deleteProductIngredient);

module.exports = router;
