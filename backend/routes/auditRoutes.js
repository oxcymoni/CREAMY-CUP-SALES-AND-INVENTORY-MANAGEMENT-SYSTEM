const express = require("express");
const router = express.Router();
const AuditControllers = require("../controllers/auditControllers");
const SalesControllers = require("../controllers/salesControllers");


router.get("/equipment", AuditControllers.getEquipment);
router.get("/equipment/:id", AuditControllers.getEquipmentById);
router.post("/equipment", AuditControllers.createEquipment);
router.put("/equipment/:id", AuditControllers.updateEquipment);
router.delete("/equipment/:id", AuditControllers.deleteEquipment);


router.get("/rates", AuditControllers.getRentalRates);
router.get("/rates/:id", AuditControllers.getRentalRateById);
router.post("/rates", AuditControllers.createRentalRate);
router.put("/rates/:id", AuditControllers.updateRentalRate);
router.delete("/rates/:id", AuditControllers.deleteRentalRate);


router.get("/rentals", SalesControllers.getRentalLogs);
router.get("/rentals/:id", SalesControllers.getRentalLogById);
router.post("/rentals", SalesControllers.createRentalLog);
router.put("/rentals/:id", SalesControllers.updateRentalLog);
router.delete("/rentals/:id", SalesControllers.deleteRentalLog);


module.exports = router;
