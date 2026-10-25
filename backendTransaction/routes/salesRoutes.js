const express = require("express");
const router = express.Router();
const Controller = require("../controllers/saleController");

router.get("/sales/report/inner", Controller.getInnerJoinReport);
router.get("/sales/report/left", Controller.getLeftJoinReport);
router.get("/sales/report/full", Controller.getFullOuterJoinReport);

router.get("/sales", Controller.getSales);
router.get("/sales/:id", Controller.getSaleById);
router.post("/sales", Controller.addSale);
router.put("/sales/:id", Controller.updateSale);
router.delete("/sales/:id", Controller.deleteSale);

router.get("/payments", Controller.getPayments);
router.get("/payments/:id", Controller.getPaymentById);
router.post("/payments", Controller.addPayment);
router.put("/payments/:id", Controller.updatePayment);
router.delete("/payments/:id", Controller.deletePayment);

module.exports = router;