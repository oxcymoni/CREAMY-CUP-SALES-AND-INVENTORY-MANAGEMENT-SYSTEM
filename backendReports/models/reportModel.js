const db = require("../config/db");

const ReportModel = {
  getDailySalesReport: (callback) => {
    const sql = `
      SELECT
        DATE(sale_date) AS sale_date,
        COUNT(sale_id) AS total_transactions,
        SUM(total_amount) AS total_amount
      FROM sales
      GROUP BY DATE(sale_date)
      ORDER BY sale_date DESC
    `;
    db.query(sql, callback);
  },

  getPurchaseReport: (callback) => {
    const sql = `
      SELECT
        p.purchase_id,
        COALESCE(sp.supplier_name, 'N/A') AS supplier_name,
        p.purchase_date,
        p.total_cost,
        p.status
      FROM purchases p
      LEFT JOIN suppliers sp ON p.supplier_id = sp.supplier_id
      ORDER BY p.purchase_date DESC
    `;
    db.query(sql, callback);
  },

  getRentalReport: (callback) => {
    const sql = `
      SELECT
        r.rental_id,
        COALESCE(eq.equipment_name, 'N/A') AS equipment_name,
        COALESCE(c.customer_name, 'Walk-in') AS customer_name,
        r.start_time,
        r.end_time,
        r.total_amount,
        r.status
      FROM rentals r
      LEFT JOIN rental_equipment eq ON r.equipment_id = eq.equipment_id
      LEFT JOIN customers c ON r.customer_id = c.customer_id
      ORDER BY r.start_time DESC
    `;
    db.query(sql, callback);
  },

  getPaymentsReport: (callback) => {
    const sql = `
      SELECT
        payment_id,
        sale_id,
        rental_id,
        amount,
        payment_method,
        payment_date
      FROM payments
      ORDER BY payment_date DESC
    `;
    db.query(sql, callback);
  },
};

module.exports = ReportModel;
