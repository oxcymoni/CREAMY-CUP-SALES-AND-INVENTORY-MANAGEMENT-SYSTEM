const db = require("../config/db");

const SALE_SQL = `
  SELECT s.sale_id, s.customer_id, s.user_id, s.sale_date, s.total_amount, s.status, p.payment_method
  FROM sales s
  LEFT JOIN payments p ON s.sale_id = p.sale_id`;

const RENTAL_SQL = `
  SELECT r.rental_id, r.customer_id, r.user_id, r.equipment_id, r.rate_id, r.start_time, r.end_time,
         r.total_amount, r.status, e.equipment_name, c.customer_name, u.username
  FROM rentals r
  LEFT JOIN rental_equipment e ON r.equipment_id = e.equipment_id
  LEFT JOIN customers c ON r.customer_id = c.customer_id
  LEFT JOIN users u ON r.user_id = u.user_id`;

const MOVEMENT_SQL = `
  SELECT sm.movement_id, sm.inventory_id, sm.user_id, sm.movement_type, sm.quantity, sm.movement_date,
         i.item_name, u.username
  FROM stock_movements sm
  LEFT JOIN inventory i ON sm.inventory_id = i.inventory_id
  LEFT JOIN users u ON sm.user_id = u.user_id`;

const PURCHASE_SQL = `
  SELECT pu.purchase_id, pu.supplier_id, pu.user_id, pu.purchase_date, pu.total_cost, pu.status,
         sp.supplier_name, u.username
  FROM purchases pu
  LEFT JOIN suppliers sp ON pu.supplier_id = sp.supplier_id
  LEFT JOIN users u ON pu.user_id = u.user_id`;

function syncRental(rental_id, data, done) {
  const { equipment_id, status, total_amount, payment_method } = data;
  db.query(
    "UPDATE rental_equipment SET status = ? WHERE equipment_id = ?",
    [status === "Completed" ? "Available" : "Rented", equipment_id],
    () => {
      if (status !== "Completed" || !(total_amount > 0)) return done();
      db.query(
        "UPDATE payments SET amount = ?, payment_method = ? WHERE rental_id = ?",
        [total_amount, payment_method || "Cash", rental_id],
        (err, result) => {
          if (err || result.affectedRows > 0) return done();
          db.query(
            "INSERT INTO payments (rental_id, amount, payment_method, payment_date) VALUES (?, ?, ?, NOW())",
            [rental_id, total_amount, payment_method || "Cash"],
            () => done(),
          );
        },
      );
    },
  );
}

const SalesModel = {
  // SALES
  getSales: (callback) => {
    db.query(`${SALE_SQL} ORDER BY s.sale_date DESC`, callback);
  },
  getSaleById: (id, callback) => {
    db.query(`${SALE_SQL} WHERE s.sale_id = ?`, [id], callback);
  },
  addSale: (data, callback) => {
    const { customer_id, user_id, sale_date, total_amount, payment_method, status } = data;
    const date = sale_date || new Date();
    const amount = total_amount || 0;
    db.query(
      "INSERT INTO sales (customer_id, user_id, sale_date, total_amount, status) VALUES (?, ?, ?, ?, ?)",
      [customer_id, user_id, date, amount, status || "Completed"],
      (err, result) => {
        if (err) return callback(err, null);
        const done = () => callback(null, { sale_id: result.insertId, total_amount: amount });
        if (!payment_method || !(amount > 0)) return done();
        db.query(
          "INSERT INTO payments (sale_id, amount, payment_method, payment_date) VALUES (?, ?, ?, ?)",
          [result.insertId, amount, payment_method, date],
          () => done(),
        );
      },
    );
  },
  updateSale: (id, data, callback) => {
    const { customer_id, user_id, sale_date, total_amount, payment_method, status } = data;
    db.query(
      "UPDATE sales SET customer_id = ?, user_id = ?, sale_date = ?, total_amount = ?, status = ? WHERE sale_id = ?",
      [customer_id, user_id, sale_date || new Date(), total_amount || 0, status, id],
      (err, result) => {
        if (err || !payment_method) return callback(err, result);
        db.query(
          "UPDATE payments SET amount = ?, payment_method = ? WHERE sale_id = ?",
          [total_amount || 0, payment_method, id],
          () => callback(null, result),
        );
      },
    );
  },
  deleteSale: (id, callback) => {
    db.query("DELETE FROM payments WHERE sale_id = ?", [id], (err) => {
      if (err) return callback(err);
      db.query("DELETE FROM sales WHERE sale_id = ?", [id], callback);
    });
  },

  // RENTAL LOGS 
  getRentalLogs: (callback) => {
    db.query(`${RENTAL_SQL} ORDER BY r.rental_id DESC`, callback);
  },
  getRentalLogById: (id, callback) => {
    db.query(`${RENTAL_SQL} WHERE r.rental_id = ?`, [id], callback);
  },
  createRentalLog: (data, callback) => {
    const { customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount } = data;
    const status = data.status || "Active";
    db.query(
      "INSERT INTO rentals (customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [customer_id, user_id, equipment_id, rate_id, start_time || new Date(), end_time || null, total_amount || 0, status],
      (err, result) => {
        if (err) return callback(err);
        syncRental(result.insertId, { ...data, status }, () => callback(null, result));
      },
    );
  },
  updateRentalLog: (id, data, callback) => {
    const { customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status } = data;
    db.query(
      "UPDATE rentals SET customer_id = ?, user_id = ?, equipment_id = ?, rate_id = ?, start_time = ?, end_time = ?, total_amount = ?, status = ? WHERE rental_id = ?",
      [customer_id, user_id, equipment_id, rate_id, start_time || null, end_time || null, total_amount || 0, status, id],
      (err, result) => {
        if (err || result.affectedRows === 0) return callback(err, result);
        syncRental(id, data, () => callback(null, result));
      },
    );
  },
  deleteRentalLog: (id, callback) => {
    db.query(
      "UPDATE rental_equipment e INNER JOIN rentals r ON e.equipment_id = r.equipment_id SET e.status = 'Available' WHERE r.rental_id = ?",
      [id],
      () => {
        db.query("DELETE FROM payments WHERE rental_id = ?", [id], () => {
          db.query("DELETE FROM rentals WHERE rental_id = ?", [id], callback);
        });
      },
    );
  },

  // STOCK MOVEMENTS
  getStockMovements: (callback) => {
    db.query(`${MOVEMENT_SQL} ORDER BY sm.movement_id DESC`, callback);
  },
  getStockMovementById: (id, callback) => {
    db.query(`${MOVEMENT_SQL} WHERE sm.movement_id = ?`, [id], callback);
  },
  addStockMovement: (data, callback) => {
    const { inventory_id, user_id, movement_type, quantity, movement_date } = data;
    db.query(
      "INSERT INTO stock_movements (inventory_id, user_id, movement_type, quantity, movement_date) VALUES (?, ?, ?, ?, ?)",
      [inventory_id, user_id, movement_type, quantity, movement_date || new Date()],
      callback,
    );
  },
  updateStockMovement: (id, data, callback) => {
    const { inventory_id, user_id, movement_type, quantity, movement_date } = data;
    db.query(
      "UPDATE stock_movements SET inventory_id = ?, user_id = ?, movement_type = ?, quantity = ?, movement_date = ? WHERE movement_id = ?",
      [inventory_id, user_id, movement_type, quantity, movement_date || new Date(), id],
      callback,
    );
  },
  deleteStockMovement: (id, callback) => {
    db.query("DELETE FROM stock_movements WHERE movement_id = ?", [id], callback);
  },

  // PURCHASE HISTORY
  getPurchaseHistory: (callback) => {
    db.query(`${PURCHASE_SQL} ORDER BY pu.purchase_date DESC`, callback);
  },
  getPurchaseHistoryById: (id, callback) => {
    db.query(`${PURCHASE_SQL} WHERE pu.purchase_id = ?`, [id], callback);
  },
  addPurchaseHistory: (data, callback) => {
    const { supplier_id, user_id, purchase_date, total_cost, status } = data;
    db.query(
      "INSERT INTO purchases (supplier_id, user_id, purchase_date, total_cost, status) VALUES (?, ?, ?, ?, ?)",
      [supplier_id, user_id, purchase_date || new Date(), total_cost || 0, status || "Completed"],
      callback,
    );
  },
  updatePurchaseHistory: (id, data, callback) => {
    const { supplier_id, user_id, purchase_date, total_cost, status } = data;
    db.query(
      "UPDATE purchases SET supplier_id = ?, user_id = ?, purchase_date = ?, total_cost = ?, status = ? WHERE purchase_id = ?",
      [supplier_id, user_id, purchase_date || new Date(), total_cost, status, id],
      callback,
    );
  },
  deletePurchaseHistory: (id, callback) => {
    db.query("DELETE FROM purchases WHERE purchase_id = ?", [id], callback);
  },
};

module.exports = SalesModel;