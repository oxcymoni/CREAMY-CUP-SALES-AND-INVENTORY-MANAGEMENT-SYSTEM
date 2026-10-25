const db = require("../config/db");

const ReportModel = {
  getSalesReport: (callback) => {
    const sql = `
      SELECT
        s.sale_id,
        c.customer_name,
        s.sale_date,
        s.total_amount,
        s.status
      FROM Sales s
      INNER JOIN Customers c
      ON s.customer_id = c.customer_id
      ORDER BY s.sale_date DESC
    `;
    db.query(sql, callback);
  },

  getPurchaseReport: (callback) => {
    const sql = `
      SELECT
        p.purchase_id,
        s.supplier_name,
        p.purchase_date,
        p.total_cost,
        p.status
      FROM Purchase p
      INNER JOIN Suppliers s
      ON p.supplier_id = s.supplier_id
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
      FROM Inventory
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
      FROM Inventory
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
      FROM Stock_Alerts sa
      INNER JOIN Inventory i
      ON sa.inventory_id = i.inventory_id
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
      FROM Payments
      ORDER BY payment_date DESC
    `;
    db.query(sql, callback);
  },
};

module.exports = ReportModel;
