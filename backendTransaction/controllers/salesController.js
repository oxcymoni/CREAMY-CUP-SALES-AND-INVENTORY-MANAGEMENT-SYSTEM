const Model = require("../models/model");

const Controller = {
  getSales: (req, answer) => {
    Model.getSales((err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(200).json(results);
    });
  },

  getSaleById: (req, answer) => {
    Model.getSaleById(req.params.id, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      if (results.length === 0)
        return answer.status(404).json({ message: "Sale not found" });
      answer.status(200).json(results[0]);
    });
  },

  addSale: (req, answer) => {
    Model.addSale(req.body, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(201).json({
        message: "Sale added successfully",
        sale_id: results.sale_id,
        total_amount: results.total_amount
      });
    });
  },

  updateSale: (req, answer) => {
    Model.updateSale(req.params.id, req.body, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return answer.status(404).json({ message: "Sale not found" });
      answer.status(200).json({ message: "Sale updated successfully" });
    });
  },

  deleteSale: (req, answer) => {
    Model.deleteSale(req.params.id, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return answer.status(404).json({ message: "Sale not found" });
      answer.status(200).json({ message: "Sale deleted successfully" });
    });
  },

  getPayments: (req, answer) => {
    Model.getPayments((err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(200).json(results);
    });
  },

  getPaymentById: (req, answer) => {
    Model.getPaymentById(req.params.id, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      if (results.length === 0)
        return answer.status(404).json({ message: "Payment not found" });
      answer.status(200).json(results[0]);
    });
  },

  addPayment: (req, answer) => {
    Model.addPayment(req.body, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(201).json({ message: "Payment added successfully", payment_id: results.insertId });
    });
  },

  updatePayment: (req, answer) => {
    Model.updatePayment(req.params.id, req.body, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return answer.status(404).json({ message: "Payment not found" });
      answer.status(200).json({ message: "Payment updated successfully" });
    });
  },

  deletePayment: (req, answer) => {
    Model.deletePayment(req.params.id, (err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return answer.status(404).json({ message: "Payment not found" });
      answer.status(200).json({ message: "Payment deleted successfully" });
    });
  },

  getInnerJoinReport: (req, answer) => {
    Model.getInnerJoinReport((err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(200).json(results);
    });
  },

  getLeftJoinReport: (req, answer) => {
    Model.getLeftJoinReport((err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(200).json(results);
    });
  },

  getFullOuterJoinReport: (req, answer) => {
    Model.getFullOuterJoinReport((err, results) => {
      if (err) return answer.status(500).json({ error: err.message });
      answer.status(200).json(results);
    });
  }
};

module.exports = Controller;