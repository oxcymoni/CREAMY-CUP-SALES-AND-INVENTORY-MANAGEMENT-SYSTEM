const AuditModel = require("../models/auditModels");


const AuditControllers = {
  // EQUIPMENT AUDIT
  getEquipment: (req, res) => {
    AuditModel.getAllEquipment((err, results) => {
      if (err) {
        console.error("SQL Error in getEquipment:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results || []);
    });
  },


  getEquipmentById: (req, res) => {
    AuditModel.getEquipmentById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Equipment not found" });
      res.status(200).json(results[0]);
    });
  },


  createEquipment: (req, res) => {
    AuditModel.createEquipment(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Equipment created successfully",
        equipment_id: results.insertId,
      });
    });
  },


  updateEquipment: (req, res) => {
    AuditModel.updateEquipment(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Equipment not found" });
      res.status(200).json({ message: "Equipment updated successfully" });
    });
  },


  deleteEquipment: (req, res) => {
    AuditModel.deleteEquipment(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Equipment not found" });
      res.status(200).json({ message: "Equipment deleted successfully" });
    });
  },


  // RENTAL RATES AUDIT
  getRentalRates: (req, res) => {
    AuditModel.getAllRentalRates((err, results) => {
      if (err) {
        console.error("SQL Error in getRentalRates:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results || []);
    });
  },


  getRentalRateById: (req, res) => {
    AuditModel.getRentalRateById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Rental rate not found" });
      res.status(200).json(results[0]);
    });
  },


  createRentalRate: (req, res) => {
    AuditModel.createRentalRate(req.body, (err, results) => {
      if (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2" || err.errno === 1452) {
          return res.status(400).json({
            error: "Selected Equipment ID does not exist in database",
          });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Rental rate created successfully",
        rate_id: results.insertId,
      });
    });
  },


  updateRentalRate: (req, res) => {
    AuditModel.updateRentalRate(req.params.id, req.body, (err, results) => {
      if (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2" || err.errno === 1452) {
          return res.status(400).json({
            error: "Selected Equipment ID does not exist in database",
          });
        }
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Rental rate not found" });
      res.status(200).json({ message: "Rental rate updated successfully" });
    });
  },


  deleteRentalRate: (req, res) => {
    AuditModel.deleteRentalRate(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Rental rate not found" });
      res.status(200).json({ message: "Rental rate deleted successfully" });
    });
  },
};


module.exports = AuditControllers;
