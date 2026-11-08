const express = require("express");
const router = express.Router();
const AuditController = require("../controllers/auditController");

router.get("/audit/equipment", AuditController.getEquipment);
router.get("/audit/equipment/:id", AuditController.getEquipmentById);
router.post("/audit/equipment", AuditController.createEquipment);
router.put("/audit/equipment/:id", AuditController.updateEquipment);
router.delete("/audit/equipment/:id", AuditController.deleteEquipment);

router.get("/audit/rates", AuditController.getRentalRates);
router.get("/audit/rates/:id", AuditController.getRentalRateById);
router.post("/audit/rates", AuditController.createRentalRate);
router.put("/audit/rates/:id", AuditController.updateRentalRate);
router.delete("/audit/rates/:id", AuditController.deleteRentalRate);

router.get("/audit/rentals", AuditController.getRentals);
router.get("/audit/rentals/:id", AuditController.getRentalById);
router.post("/audit/rentals", AuditController.createRental);
router.put("/audit/rentals/:id", AuditController.updateRental);
router.delete("/audit/rentals/:id", AuditController.deleteRental);

module.exports = router;