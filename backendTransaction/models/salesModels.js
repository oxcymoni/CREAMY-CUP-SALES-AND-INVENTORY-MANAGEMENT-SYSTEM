const db = require("../config/db");

function formatSqlDateTime(val) {
  if (!val) return null;
  if (val instanceof Date) {
    return val.toISOString().slice(0, 19).replace("T", " ");
  }
  const s = String(val).trim();
  if (!s) return null;
  return s.replace("T", " ").slice(0, 19);
}

const Model = {
  // ─── SALES ───────────────────────────────────────────────
  getSales: (callback) => {
    const sql = `
      SELECT s.*, p.payment_method
      FROM sales s
      LEFT JOIN payments p ON s.sale_id = p.sale_id
      ORDER BY s.sale_date DESC
    `;
    db.query(sql, callback);
  },

  getSaleById: (id, callback) => {
    const sql = `
      SELECT s.*, p.payment_method
      FROM sales s
      LEFT JOIN payments p ON s.sale_id = p.sale_id
      WHERE s.sale_id = ?
    `;
    db.query(sql, [id], callback);
  },

  addSale: (data, callback) => {
    let total_amount = 0;
    if (data.items && data.items.length > 0) {
      total_amount = data.items.reduce(
        (total, item) => total + item.quantity * item.unit_price,
        0
      );
    } else {
      total_amount = parseFloat(data.total_amount) || 0;
    }

    const saleDate = formatSqlDateTime(data.sale_date) || formatSqlDateTime(new Date());

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
        const saleId = saleResult.insertId;

        if (data.payment_method && total_amount > 0) {
          db.query(
            "INSERT INTO payments (sale_id, amount, payment_method, payment_date) VALUES (?, ?, ?, ?)",
            [saleId, total_amount, data.payment_method, saleDate],
            () => {}
          );
        }
        callback(null, { sale_id: saleId, total_amount });
      }
    );
  },

  updateSale: (id, data, callback) => {
    const saleDate = formatSqlDateTime(data.sale_date) || formatSqlDateTime(new Date());
    const totalAmount = parseFloat(data.total_amount) || 0;

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
        saleDate,
        totalAmount,
        data.status,
        id,
      ],
      (err, result) => {
        if (err) return callback(err);

        // Update payment method/amount if payment record exists
        if (data.payment_method) {
          db.query(
            "UPDATE payments SET amount = ?, payment_method = ? WHERE sale_id = ?",
            [totalAmount, data.payment_method, id],
            () => callback(null, result)
          );
        } else {
          callback(null, result);
        }
      }
    );
  },

  deleteSale: (id, callback) => {
    db.query("DELETE FROM payments WHERE sale_id = ?", [id], (payErr) => {
      if (payErr) return callback(payErr);
      db.query("DELETE FROM sales WHERE sale_id = ?", [id], callback);
    });
  },

  // ─── RENTAL LOGS ─────────────────────────────────────────
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
    const sql = `
      SELECT r.*, eq.equipment_name, c.customer_name, u.username, p.payment_method
      FROM rentals r
      LEFT JOIN rental_equipment eq ON r.equipment_id = eq.equipment_id
      LEFT JOIN customers c ON r.customer_id = c.customer_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN payments p ON r.rental_id = p.rental_id
      WHERE r.rental_id = ?
    `;
    db.query(sql, [id], callback);
  },

  createRentalLog: (data, callback) => {
    const sql = `
      INSERT INTO rentals (customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const status = data.status || "Active";
    const amount = parseFloat(data.total_amount) || 0;
    const equipmentId = data.equipment_id;
    const startTime = formatSqlDateTime(data.start_time) || formatSqlDateTime(new Date());
    const endTime = formatSqlDateTime(data.end_time);

    db.query(
      sql,
      [
        data.customer_id,
        data.user_id,
        equipmentId,
        data.rate_id,
        startTime,
        endTime,
        amount,
        status,
      ],
      (err, result) => {
        if (err) return callback(err);
        const rentalId = result.insertId;

        const eqStatus = status === "Completed" ? "Available" : "Rented";
        db.query(
          "UPDATE rental_equipment SET status = ? WHERE equipment_id = ?",
          [eqStatus, equipmentId],
          (eqErr) => {
            if (eqErr) console.error("Error updating equipment status:", eqErr.message);

            if (status === "Completed" && amount > 0) {
              db.query(
                "INSERT INTO payments (rental_id, amount, payment_method, payment_date) VALUES (?, ?, ?, NOW())",
                [rentalId, amount, data.payment_method || "Cash"],
                () => callback(null, result)
              );
            } else {
              callback(null, result);
            }
          }
        );
      }
    );
  },

  updateRentalLog: (id, data, callback) => {
    const sql = `
      UPDATE rentals
      SET customer_id = ?, user_id = ?, equipment_id = ?, rate_id = ?, start_time = ?, end_time = ?, total_amount = ?, status = ?
      WHERE rental_id = ?
    `;
    const status = data.status;
    const amount = parseFloat(data.total_amount) || 0;
    const equipmentId = data.equipment_id;
    const startTime = formatSqlDateTime(data.start_time);
    const endTime = formatSqlDateTime(data.end_time);

    db.query(
      sql,
      [
        data.customer_id,
        data.user_id,
        equipmentId,
        data.rate_id,
        startTime,
        endTime,
        amount,
        status,
        id,
      ],
      (err, result) => {
        if (err) return callback(err);

        const eqStatus = status === "Completed" ? "Available" : "Rented";
        db.query(
          "UPDATE rental_equipment SET status = ? WHERE equipment_id = ?",
          [eqStatus, equipmentId],
          () => {
            if (status === "Completed" && amount > 0) {
              db.query(
                "SELECT payment_id FROM payments WHERE rental_id = ?",
                [id],
                (checkErr, rows) => {
                  if (!checkErr && rows && rows.length === 0) {
                    db.query(
                      "INSERT INTO payments (rental_id, amount, payment_method, payment_date) VALUES (?, ?, ?, NOW())",
                      [id, amount, data.payment_method || "Cash"],
                      () => callback(null, result)
                    );
                  } else if (!checkErr && rows && rows.length > 0) {
                    db.query(
                      "UPDATE payments SET amount = ?, payment_method = ? WHERE rental_id = ?",
                      [amount, data.payment_method || "Cash", id],
                      () => callback(null, result)
                    );
                  } else {
                    callback(null, result);
                  }
                }
              );
            } else {
              callback(null, result);
            }
          }
        );
      }
    );
  },

  deleteRentalLog: (id, callback) => {
    db.query(
      "SELECT equipment_id FROM rentals WHERE rental_id = ?",
      [id],
      (err, rows) => {
        if (!err && rows && rows.length > 0) {
          db.query(
            "UPDATE rental_equipment SET status = 'Available' WHERE equipment_id = ?",
            [rows[0].equipment_id],
            () => {}
          );
        }

        db.query("DELETE FROM payments WHERE rental_id = ?", [id], () => {
          
          db.query("DELETE FROM rentals WHERE rental_id = ?", [id], callback);
        });
      }
    );
  },

  // ─── STOCK MOVEMENTS ─────────────────────────────────────
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

  getStockMovementById: (id, callback) => {
    const sql = `
      SELECT sm.*, i.item_name, u.username
      FROM stock_movements sm
      LEFT JOIN inventory i ON sm.inventory_id = i.inventory_id
      LEFT JOIN users u ON sm.user_id = u.user_id
      WHERE sm.movement_id = ?
    `;
    db.query(sql, [id], callback);
  },

  addStockMovement: (data, callback) => {
    const sql = `
      INSERT INTO stock_movements (inventory_id, user_id, movement_type, quantity, movement_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const moveDate = formatSqlDateTime(data.movement_date) || formatSqlDateTime(new Date());

    db.query(
      sql,
      [
        data.inventory_id,
        data.user_id,
        data.movement_type,
        data.quantity,
        moveDate,
      ],
      callback
    );
  },

  updateStockMovement: (id, data, callback) => {
    const sql = `
      UPDATE stock_movements
      SET inventory_id = ?, user_id = ?, movement_type = ?, quantity = ?, movement_date = ?
      WHERE movement_id = ?
    `;
    const moveDate = formatSqlDateTime(data.movement_date) || formatSqlDateTime(new Date());

    db.query(
      sql,
      [
        data.inventory_id,
        data.user_id,
        data.movement_type,
        data.quantity,
        moveDate,
        id,
      ],
      callback
    );
  },

  deleteStockMovement: (id, callback) => {
    const sql = "DELETE FROM stock_movements WHERE movement_id = ?";
    db.query(sql, [id], callback);
  },

  // ─── PURCHASE HISTORY ────────────────────────────────────
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

  getPurchaseHistoryById: (id, callback) => {
    const sql = `
      SELECT p.*, s.supplier_name, u.username
      FROM purchases p
      LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
      LEFT JOIN users u ON p.user_id = u.user_id
      WHERE p.purchase_id = ?
    `;
    db.query(sql, [id], callback);
  },

  addPurchaseHistory: (data, callback) => {
    const sql = `
      INSERT INTO purchases (supplier_id, user_id, purchase_date, total_cost, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    const pDate = formatSqlDateTime(data.purchase_date) || formatSqlDateTime(new Date());

    db.query(
      sql,
      [
        data.supplier_id,
        data.user_id,
        pDate,
        data.total_cost || 0,
        data.status || "Completed",
      ],
      callback
    );
  },

  updatePurchaseHistory: (id, data, callback) => {
    const sql = `
      UPDATE purchases
      SET supplier_id = ?, user_id = ?, purchase_date = ?, total_cost = ?, status = ?
      WHERE purchase_id = ?
    `;
    const pDate = formatSqlDateTime(data.purchase_date) || formatSqlDateTime(new Date());

    db.query(
      sql,
      [
        data.supplier_id,
        data.user_id,
        pDate,
        data.total_cost,
        data.status,
        id,
      ],
      callback
    );
  },

  deletePurchaseHistory: (id, callback) => {
    const sql = "DELETE FROM purchases WHERE purchase_id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Model;