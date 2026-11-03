const Model = require("../models/salesModels");

const Controller = {
  // ─── SALES ───────────────────────────────────────────────
  getSales: (req, res) => {
    Model.getSales((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results || []);
    });
  },

  getSaleById: (req, res) => {
    Model.getSaleById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Sale not found" });
      res.status(200).json(results[0]);
    });
  },

  addSale: (req, res) => {
    Model.addSale(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Sale added successfully",
        sale_id: results.sale_id,
        total_amount: results.total_amount,
      });
    });
  },

  updateSale: (req, res) => {
    Model.updateSale(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Sale not found" });
      res.status(200).json({ message: "Sale updated successfully" });
    });
  },

  deleteSale: (req, res) => {
    Model.deleteSale(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Sale not found" });
      res.status(200).json({ message: "Sale deleted successfully" });
    });
  },

  // ─── RENTAL LOGS ─────────────────────────────────────────
  getRentalLogs: (req, res) => {
    Model.getRentalLogs((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results || []);
    });
  },

  getRentalLogById: (req, res) => {
    Model.getRentalLogById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Rental log not found" });
      res.status(200).json(results[0]);
    });
  },

  createRentalLog: (req, res) => {
    Model.createRentalLog(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Rental log created successfully",
        id: results.insertId,
      });
    });
  },

  updateRentalLog: (req, res) => {
    Model.updateRentalLog(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Rental log not found" });
      res.status(200).json({ message: "Rental log updated successfully" });
    });
  },

  deleteRentalLog: (req, res) => {
    Model.deleteRentalLog(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Rental log not found" });
      res.status(200).json({ message: "Rental log deleted successfully" });
    });
  },

  // ─── STOCK MOVEMENTS ─────────────────────────────────────
  getStockMovements: (req, res) => {
    Model.getStockMovements((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results || []);
    });
  },

  getStockMovementById: (req, res) => {
    Model.getStockMovementById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Stock movement not found" });
      res.status(200).json(results[0]);
    });
  },

  addStockMovement: (req, res) => {
    Model.addStockMovement(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Stock movement added successfully",
        id: results.insertId,
      });
    });
  },

  updateStockMovement: (req, res) => {
    Model.updateStockMovement(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Stock movement not found" });
      res.status(200).json({ message: "Stock movement updated successfully" });
    });
  },

  deleteStockMovement: (req, res) => {
    Model.deleteStockMovement(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Stock movement not found" });
      res.status(200).json({ message: "Stock movement deleted successfully" });
    });
  },

  // ─── PURCHASE HISTORY ────────────────────────────────────
  getPurchaseHistory: (req, res) => {
    Model.getPurchaseHistory((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results || []);
    });
  },

  getPurchaseHistoryById: (req, res) => {
    Model.getPurchaseHistoryById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Purchase record not found" });
      res.status(200).json(results[0]);
    });
  },

  addPurchaseHistory: (req, res) => {
    Model.addPurchaseHistory(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Purchase record added successfully",
        purchase_id: results.insertId,
      });
    });
  },

  updatePurchaseHistory: (req, res) => {
    Model.updatePurchaseHistory(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Purchase record not found" });
      res.status(200).json({ message: "Purchase record updated successfully" });
    });
  },

  deletePurchaseHistory: (req, res) => {
    Model.deletePurchaseHistory(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Purchase record not found" });
      res.status(200).json({ message: "Purchase record deleted successfully" });
    });
  },
};

module.exports = Controller;