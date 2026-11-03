const db = require("../config/db");

const ReportModel = {
  getSalesReport: (callback) => {
    const sql = `
      SELECT
        s.sale_id,
        COALESCE(c.customer_name, 'Walk-in / Guest') AS customer_name,
        s.sale_date,
        s.total_amount,
        s.status
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.customer_id
      ORDER BY s.sale_date DESC
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

  getInventoryReport: (callback) => {
    const sql = `
      SELECT
        inventory_id,
        item_name,
        unit,
        quantity_on_hand,
        reorder_level
      FROM inventory
    `;
    db.query(sql, callback);
  },

  getLowStockReport: (callback) => {
    const sql = `
      SELECT
        inventory_id,
        item_name,
        quantity_on_hand,
        reorder_level
      FROM inventory
      WHERE quantity_on_hand <= reorder_level
    `;
    db.query(sql, callback);
  },

  getStockAlertsReport: (callback) => {
    const sql = `
      SELECT
        sa.alert_id,
        i.item_name,
        sa.alert_date,
        sa.alert_message,
        sa.alert_status
      FROM stock_alerts sa
      INNER JOIN inventory i ON sa.inventory_id = i.inventory_id
      ORDER BY sa.alert_date DESC
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
