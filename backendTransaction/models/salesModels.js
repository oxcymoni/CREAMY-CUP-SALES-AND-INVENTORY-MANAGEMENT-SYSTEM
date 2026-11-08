const db = require("../config/db");

const Model = {

  getSales: (callback) => {
    const sql = "SELECT * FROM Sales";
    db.query(sql, callback);
  },

  getSaleById: (id, callback) => {
    const sql = "SELECT * FROM Sales WHERE sale_id = ?";
    db.query(sql, [id], callback);
  },

  addSale: (data, callback) => {
    let total_amount = 0;
    if (data.items && data.items.length > 0) {
      total_amount = data.items.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
    } else {
      total_amount = data.total_amount || 0;
    }

    const saleSql = `
      INSERT INTO Sales (customer_id, user_id, sale_date, total_amount, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(saleSql, [
      data.customer_id,
      data.user_id,
      data.sale_date,
      total_amount,
      data.status || 'Completed'
    ], (err, saleResult) => {
      if (err) return callback(err, null);
      
      const sale_id = saleResult.insertId;

      // If there is a payment, insert it
      if (data.payment_method && data.amount) {
        const paymentSql = `
          INSERT INTO Payments (sale_id, rental_id, amount, payment_method, payment_date)
          VALUES (?, ?, ?, ?, ?)
        `;
        db.query(paymentSql, [
          sale_id,
          data.rental_id || null,
          data.amount,
          data.payment_method,
          data.payment_date || new Date()
        ], (paymentErr) => {
          if (paymentErr) return callback(paymentErr, null);
          callback(null, { sale_id, total_amount });
        });
      } else {
        callback(null, { sale_id, total_amount });
      }
    });
  },

  updateSale: (id, data, callback) => {
    const sql = `
      UPDATE Sales
      SET customer_id = ?, user_id = ?, sale_date = ?, total_amount = ?, status = ?
      WHERE sale_id = ?
    `;
    db.query(
      sql,
      [data.customer_id, data.user_id, data.sale_date, data.total_amount, data.status, id],
      callback
    );
  },

  deleteSale: (id, callback) => {
    const sql = "DELETE FROM Sales WHERE sale_id = ?";
    db.query(sql, [id], callback);
  },

  getPayments: (callback) => {
    const sql = "SELECT * FROM Payments";
    db.query(sql, callback);
  },

  getPaymentById: (id, callback) => {
    const sql = "SELECT * FROM Payments WHERE payment_id = ?";
    db.query(sql, [id], callback);
  },

  addPayment: (data, callback) => {
    const sql = `
      INSERT INTO Payments (sale_id, rental_id, amount, payment_method, payment_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [data.sale_id || null, data.rental_id || null, data.amount, data.payment_method, data.payment_date],
      callback
    );
  },

  updatePayment: (id, data, callback) => {
    const sql = `
      UPDATE Payments
      SET sale_id = ?, rental_id = ?, amount = ?, payment_method = ?, payment_date = ?
      WHERE payment_id = ?
    `;
    db.query(
      sql,
      [data.sale_id || null, data.rental_id || null, data.amount, data.payment_method, data.payment_date, id],
      callback
    );
  },

  deletePayment: (id, callback) => {
    const sql = "DELETE FROM Payments WHERE payment_id = ?";
    db.query(sql, [id], callback);
  },

  getInnerJoinReport: (callback) => {
    const sql = `
      SELECT
        s.sale_id,
        s.sale_date,
        c.customer_id,
        u.user_id,
        p.product_id,
        sd.quantity,
        sd.unit_price,
        sd.subtotal,
        s.total_amount,
        pay.payment_method,
        pay.amount AS payment_amount,
        s.status
      FROM Sales s
      INNER JOIN Sale_Details sd ON s.sale_id = sd.sale_id
      INNER JOIN Products p ON sd.product_id = p.product_id
      INNER JOIN Customers c ON s.customer_id = c.customer_id
      INNER JOIN Users u ON s.user_id = u.user_id
      INNER JOIN Payments pay ON s.sale_id = pay.sale_id
      ORDER BY s.sale_date DESC;
    `;
    db.query(sql, callback);
  },

  getLeftJoinReport: (callback) => {
    const sql = `
      SELECT
        s.sale_id,
        s.sale_date,
        s.customer_id,
        s.total_amount,
        pay.payment_method,
        pay.amount AS payment_amount
      FROM Sales s
      LEFT JOIN Customers c ON s.customer_id = c.customer_id
      LEFT JOIN Payments pay ON s.sale_id = pay.sale_id
      ORDER BY s.sale_date DESC;
    `;
    db.query(sql, callback);
  },

  getFullOuterJoinReport: (callback) => {
    const sql = `
      SELECT
        s.sale_id,
        s.total_amount,
        pay.payment_id,
        pay.amount AS payment_amount,
        'Sale / Matched' AS record_type
      FROM Sales s
      LEFT JOIN Payments pay ON s.sale_id = pay.sale_id

      UNION

      SELECT
        s.sale_id,
        s.total_amount,
        pay.payment_id,
        pay.amount AS payment_amount,
        'Payment Only' AS record_type
      FROM Sales s
      RIGHT JOIN Payments pay ON s.sale_id = pay.sale_id;
    `;
    db.query(sql, callback);
  }
};

module.exports = Model;