const AuditModel = require("../models/auditModel");

const AuditController = {
  getEquipment: (req, res) => {
    AuditModel.getAllEquipment((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  getEquipmentById: (req, res) => {
    AuditModel.getEquipmentById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Equipment not found" });
      res.status(200).json(results[0]);
    });
  },
  createEquipment: (req, res) => {
    AuditModel.createEquipment(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Equipment created successfully", equipment_id: results.insertId });
    });
  },
  updateEquipment: (req, res) => {
    AuditModel.updateEquipment(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Equipment not found" });
      res.status(200).json({ message: "Equipment updated successfully" });
    });
  },
  deleteEquipment: (req, res) => {
    AuditModel.deleteEquipment(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Equipment not found" });
      res.status(200).json({ message: "Equipment deleted successfully" });
    });
  },

  getRentalRates: (req, res) => {
    AuditModel.getAllRentalRates((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  getRentalRateById: (req, res) => {
    AuditModel.getRentalRateById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Rental rate not found" });
      res.status(200).json(results[0]);
    });
  },
  createRentalRate: (req, res) => {
    AuditModel.createRentalRate(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Rental rate created successfully", rate_id: results.insertId });
    });
  },
  updateRentalRate: (req, res) => {
    AuditModel.updateRentalRate(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Rental rate not found" });
      res.status(200).json({ message: "Rental rate updated successfully" });
    });
  },
  deleteRentalRate: (req, res) => {
    AuditModel.deleteRentalRate(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Rental rate not found" });
      res.status(200).json({ message: "Rental rate deleted successfully" });
    });
  },

  getRentals: (req, res) => {
    AuditModel.getAllRentals((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  getRentalById: (req, res) => {
    AuditModel.getRentalById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Rental record not found" });
      res.status(200).json(results[0]);
    });
  },
  createRental: (req, res) => {
    AuditModel.createRental(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Rental record created successfully", rental_id: results.insertId });
    });
  },
  updateRental: (req, res) => {
    AuditModel.updateRental(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Rental record not found" });
      res.status(200).json({ message: "Rental record updated successfully" });
    });
  },
  deleteRental: (req, res) => {
    AuditModel.deleteRental(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Rental record not found" });
      res.status(200).json({ message: "Rental record deleted successfully" });
    });
  }
};

module.exports = AuditController;