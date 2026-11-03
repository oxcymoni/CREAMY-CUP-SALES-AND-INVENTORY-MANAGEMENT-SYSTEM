const db = require("../config/db");

const Model = {
  getSales: (callback) => {
    const sql = "SELECT * FROM sales ORDER BY sale_date DESC";
    db.query(sql, callback);
  },

  getSaleById: (id, callback) => {
    const sql = "SELECT * FROM sales WHERE sale_id = ?";
    db.query(sql, [id], callback);
  },

  addSale: (data, callback) => {
    let total_amount = 0;
    if (data.items && data.items.length > 0) {
      total_amount = data.items.reduce(
        (total, item) => total + item.quantity * item.unit_price,
        0,
      );
    } else {
      total_amount = data.total_amount || 0;
    }

    let saleDate = data.sale_date;
    if (!saleDate || saleDate instanceof Date) {
      const d = saleDate ? new Date(saleDate) : new Date();
      saleDate = d.toISOString().slice(0, 19).replace("T", " ");
    } else if (typeof saleDate === "string" && saleDate.includes("T")) {
      saleDate = saleDate.slice(0, 19).replace("T", " ");
    }

    const saleSql = `
      INSERT INTO sales (customer_id, user_id, sale_date, total_amount, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      saleSql,
      [
        data.customer_id,
        data.user_id,
        saleDate,
        total_amount,
        data.status || "Completed",
      ],
      (err, saleResult) => {
        if (err) return callback(err, null);
        callback(null, { sale_id: saleResult.insertId, total_amount });
      },
    );
  },

  updateSale: (id, data, callback) => {
    const sql = `
      UPDATE sales
      SET customer_id = ?, user_id = ?, sale_date = ?, total_amount = ?, status = ?
      WHERE sale_id = ?
    `;
    db.query(
      sql,
      [
        data.customer_id,
        data.user_id,
        data.sale_date,
        data.total_amount,
        data.status,
        id,
      ],
      callback,
    );
  },

  deleteSale: (id, callback) => {
    const sql = "DELETE FROM sales WHERE sale_id = ?";
    db.query(sql, [id], callback);
  },

  getRentalLogs: (callback) => {
    const sql = `
      SELECT r.*, eq.equipment_name, c.customer_name, u.username
      FROM rentals r
      LEFT JOIN rental_equipment eq ON r.equipment_id = eq.equipment_id
      LEFT JOIN customers c ON r.customer_id = c.customer_id
      LEFT JOIN users u ON r.user_id = u.user_id
      ORDER BY r.rental_id DESC
    `;
    db.query(sql, callback);
  },

  getRentalLogById: (id, callback) => {
    const sql = "SELECT * FROM rentals WHERE rental_id = ?";
    db.query(sql, [id], callback);
  },

  createRentalLog: (data, callback) => {
    const sql = `
      INSERT INTO rentals (customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        data.customer_id,
        data.user_id,
        data.equipment_id,
        data.rate_id,
        data.start_time || new Date(),
        data.end_time || null,
        data.total_amount || 0,
        data.status || "Active",
      ],
      callback,
    );
  },

  updateRentalLog: (id, data, callback) => {
    const sql = `
      UPDATE rentals
      SET customer_id = ?, user_id = ?, equipment_id = ?, rate_id = ?, start_time = ?, end_time = ?, total_amount = ?, status = ?
      WHERE rental_id = ?
    `;
    db.query(
      sql,
      [
        data.customer_id,
        data.user_id,
        data.equipment_id,
        data.rate_id,
        data.start_time,
        data.end_time,
        data.total_amount,
        data.status,
        id,
      ],
      callback,
    );
  },

  deleteRentalLog: (id, callback) => {
    const sql = "DELETE FROM rentals WHERE rental_id = ?";
    db.query(sql, [id], callback);
  },

  getStockMovements: (callback) => {
    const sql = `
      SELECT sm.*, i.item_name, u.username
      FROM stock_movements sm
      LEFT JOIN inventory i ON sm.inventory_id = i.inventory_id
      LEFT JOIN users u ON sm.user_id = u.user_id
      ORDER BY sm.movement_id DESC
    `;
    db.query(sql, callback);
  },

  addStockMovement: (data, callback) => {
    const sql = `
      INSERT INTO stock_movements (inventory_id, user_id, movement_type, quantity, movement_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        data.inventory_id,
        data.user_id,
        data.movement_type,
        data.quantity,
        data.movement_date || new Date(),
      ],
      callback,
    );
  },

  getPurchaseHistory: (callback) => {
    const sql = `
      SELECT p.*, s.supplier_name, u.username
      FROM purchases p
      LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
      LEFT JOIN users u ON p.user_id = u.user_id
      ORDER BY p.purchase_date DESC
    `;
    db.query(sql, callback);
  },
};

module.exports = Model;