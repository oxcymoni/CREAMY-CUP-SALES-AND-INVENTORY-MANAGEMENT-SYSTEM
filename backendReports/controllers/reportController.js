const ReportModel = require("../models/reportModel");

const ReportController = {
  getSalesReport: (req, res) => {
    ReportModel.getDailySalesReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getPurchaseReport: (req, res) => {
    ReportModel.getPurchaseReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getRentalReport: (req, res) => {
    ReportModel.getRentalReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getPaymentsReport: (req, res) => {
    ReportModel.getPaymentsReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results || []);
    });
  },
};

module.exports = ReportController;
