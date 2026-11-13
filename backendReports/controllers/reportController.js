const ReportModel = require("../models/reportModel");

const ReportController = {
  getSalesReport: (req, res) => {
    ReportModel.getSalesReport((err, results) => {
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

  getInventoryReport: (req, res) => {
    ReportModel.getInventoryReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getLowStockReport: (req, res) => {
    ReportModel.getLowStockReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getStockAlertsReport: (req, res) => {
    ReportModel.getStockAlertsReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getPaymentsReport: (req, res) => {
    ReportModel.getPaymentsReport((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
};

module.exports = ReportController;
