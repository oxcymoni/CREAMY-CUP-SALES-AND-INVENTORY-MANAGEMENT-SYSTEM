const express = require("express");
const router = express.Router();
const MasterDataController = require("../controllers/masterDataController");

// Categories Routes
router.get("/categories", MasterDataController.getCategories);
router.post("/categories", MasterDataController.createCategory);
router.put("/categories/:id", MasterDataController.updateCategory);
router.delete("/categories/:id", MasterDataController.deleteCategory);

// Products Routes
router.get("/products", MasterDataController.getProducts);
router.post("/products", MasterDataController.createProduct);
router.put("/products/:id", MasterDataController.updateProduct);
router.delete("/products/:id", MasterDataController.deleteProduct);

// Customers Routes
router.get("/customers", MasterDataController.getCustomers);
router.post("/customers", MasterDataController.createCustomer);

// Suppliers Routes
router.get("/suppliers", MasterDataController.getSuppliers);
router.post("/suppliers", MasterDataController.createSupplier);

module.exports = router;
