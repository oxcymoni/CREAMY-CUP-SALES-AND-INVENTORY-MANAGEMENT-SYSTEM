const db = require("../config/db");

const AuditModel = {
  getAllEquipment: (callback) => {
    db.query("SELECT * FROM Rental_Equipment", callback);
  },
  getEquipmentById: (id, callback) => {
    db.query("SELECT * FROM Rental_Equipment WHERE equipment_id = ?", [id], callback);
  },
  createEquipment: (data, callback) => {
    const { equipment_name, equipment_type, status } = data;
    db.query(
      "INSERT INTO Rental_Equipment (equipment_name, equipment_type, status) VALUES (?, ?, ?)",
      [equipment_name, equipment_type, status || "Available"],
      callback
    );
  },
  updateEquipment: (id, data, callback) => {
    const { equipment_name, equipment_type, status } = data;
    db.query(
      "UPDATE Rental_Equipment SET equipment_name = ?, equipment_type = ?, status = ? WHERE equipment_id = ?",
      [equipment_name, equipment_type, status, id],
      callback
    );
  },
  deleteEquipment: (id, callback) => {
    db.query("DELETE FROM Rental_Equipment WHERE equipment_id = ?", [id], callback);
  },

  getAllRentalRates: (callback) => {
    const sql = `
      SELECT rr.rate_id, rr.equipment_id, rr.rate_amount, rr.billing_unit, rr.effective_date,
             e.equipment_name, e.equipment_type
      FROM Rental_Rates rr
      INNER JOIN Rental_Equipment e ON rr.equipment_id = e.equipment_id
    `;
    db.query(sql, callback);
  },
  getRentalRateById: (id, callback) => {
    const sql = `
      SELECT rr.rate_id, rr.equipment_id, rr.rate_amount, rr.billing_unit, rr.effective_date,
             e.equipment_name, e.equipment_type
      FROM Rental_Rates rr
      INNER JOIN Rental_Equipment e ON rr.equipment_id = e.equipment_id
      WHERE rr.rate_id = ?
    `;
    db.query(sql, [id], callback);
  },
  createRentalRate: (data, callback) => {
    const { equipment_id, rate_amount, billing_unit, effective_date } = data;
    db.query(
      "INSERT INTO Rental_Rates (equipment_id, rate_amount, billing_unit, effective_date) VALUES (?, ?, ?, ?)",
      [equipment_id, rate_amount, billing_unit, effective_date],
      callback
    );
  },
  updateRentalRate: (id, data, callback) => {
    const { equipment_id, rate_amount, billing_unit, effective_date } = data;
    db.query(
      "UPDATE Rental_Rates SET equipment_id = ?, rate_amount = ?, billing_unit = ?, effective_date = ? WHERE rate_id = ?",
      [equipment_id, rate_amount, billing_unit, effective_date, id],
      callback
    );
  },
  deleteRentalRate: (id, callback) => {
    db.query("DELETE FROM Rental_Rates WHERE rate_id = ?", [id], callback);
  },

  getAllRentals: (callback) => {
    const sql = `
      SELECT r.rental_id, r.start_time, r.end_time, r.total_amount, r.status,
             c.customer_name, u.username, eq.equipment_name, rr.rate_amount, rr.billing_unit
      FROM Rentals r
      INNER JOIN Customers c ON r.customer_id = c.customer_id
      INNER JOIN Users u ON r.user_id = u.user_id
      INNER JOIN Rental_Equipment eq ON r.equipment_id = eq.equipment_id
      INNER JOIN Rental_Rates rr ON r.rate_id = rr.rate_id
      ORDER BY r.start_time DESC
    `;
    db.query(sql, callback);
  },
  getRentalById: (id, callback) => {
    const sql = `
      SELECT r.rental_id, r.start_time, r.end_time, r.total_amount, r.status,
             c.customer_name, u.username, eq.equipment_name, rr.rate_amount, rr.billing_unit
      FROM Rentals r
      INNER JOIN Customers c ON r.customer_id = c.customer_id
      INNER JOIN Users u ON r.user_id = u.user_id
      INNER JOIN Rental_Equipment eq ON r.equipment_id = eq.equipment_id
      INNER JOIN Rental_Rates rr ON r.rate_id = rr.rate_id
      WHERE r.rental_id = ?
    `;
    db.query(sql, [id], callback);
  },
  createRental: (data, callback) => {
    const { customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status } = data;
    db.query(
      "INSERT INTO Rentals (customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [customer_id, user_id, equipment_id, rate_id, start_time || new Date(), end_time, total_amount, status || "Active"],
      callback
    );
  },
  updateRental: (id, data, callback) => {
    const { customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status } = data;
    db.query(
      "UPDATE Rentals SET customer_id = ?, user_id = ?, equipment_id = ?, rate_id = ?, start_time = ?, end_time = ?, total_amount = ?, status = ? WHERE rental_id = ?",
      [customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status, id],
      callback
    );
  },
  deleteRental: (id, callback) => {
    db.query("DELETE FROM Rentals WHERE rental_id = ?", [id], callback);
  }
};

module.exports = AuditModel;