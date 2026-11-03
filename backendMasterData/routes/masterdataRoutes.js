const express = require("express");
const router = express.Router();
const MasterDataController = require("../controllers/masterdataController");

router.get("/suppliers", MasterDataController.getSuppliers);
router.get("/suppliers/:id", MasterDataController.getSupplierById);
router.post("/suppliers", MasterDataController.createSupplier);
router.put("/suppliers/:id", MasterDataController.updateSupplier);
router.delete("/suppliers/:id", MasterDataController.deleteSupplier);

router.get("/categories", MasterDataController.getCategories);
router.get("/categories/:id", MasterDataController.getCategoryById);
router.post("/categories", MasterDataController.createCategory);
router.put("/categories/:id", MasterDataController.updateCategory);
router.delete("/categories/:id", MasterDataController.deleteCategory);

router.get("/products", MasterDataController.getProducts);
router.get("/products/:id", MasterDataController.getProductById);
router.post("/products", MasterDataController.createProduct);
router.put("/products/:id", MasterDataController.updateProduct);
router.delete("/products/:id", MasterDataController.deleteProduct);

router.get("/employees", MasterDataController.getEmployees);
router.get("/employees/:id", MasterDataController.getEmployeeById);
router.post("/employees", MasterDataController.createEmployee);
router.put("/employees/:id", MasterDataController.updateEmployee);
router.delete("/employees/:id", MasterDataController.deleteEmployee);

module.exports = router;
