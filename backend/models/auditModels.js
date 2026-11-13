const db = require("../config/db");


const AuditModel = {
  getAllEquipment: (callback) => {
    db.query("SELECT * FROM rental_equipment", (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },


  getEquipmentById: (id, callback) => {
    db.query(
      "SELECT * FROM rental_equipment WHERE equipment_id = ?",
      [id],
      callback,
    );
  },


  createEquipment: (data, callback) => {
    const { equipment_name, equipment_type, status } = data;
    db.query(
      "INSERT INTO rental_equipment (equipment_name, equipment_type, status) VALUES (?, ?, ?)",
      [equipment_name, equipment_type, status || "Available"],
      callback,
    );
  },


  updateEquipment: (id, data, callback) => {
    const { equipment_name, equipment_type, status } = data;
    db.query(
      "UPDATE rental_equipment SET equipment_name = ?, equipment_type = ?, status = ? WHERE equipment_id = ?",
      [equipment_name, equipment_type, status, id],
      callback,
    );
  },


  deleteEquipment: (id, callback) => {
    db.query(
      "DELETE FROM rental_equipment WHERE equipment_id = ?",
      [id],
      callback,
    );
  },


  getAllRentalRates: (callback) => {
    const sql = `
      SELECT rr.rate_id, rr.equipment_id, rr.rate_amount, rr.billing_unit, rr.effective_date,
             e.equipment_name, e.equipment_type
      FROM rental_rates rr
      INNER JOIN rental_equipment e ON rr.equipment_id = e.equipment_id
    `;
    db.query(sql, callback);
  },


  getRentalRateById: (id, callback) => {
    const sql = `
      SELECT rr.rate_id, rr.equipment_id, rr.rate_amount, rr.billing_unit, rr.effective_date,
             e.equipment_name, e.equipment_type
      FROM rental_rates rr
      INNER JOIN rental_equipment e ON rr.equipment_id = e.equipment_id
      WHERE rr.rate_id = ?
    `;
    db.query(sql, [id], callback);
  },


  createRentalRate: (data, callback) => {
    const { equipment_id, rate_amount, billing_unit, effective_date } = data;
    db.query(
      "INSERT INTO rental_rates (equipment_id, rate_amount, billing_unit, effective_date) VALUES (?, ?, ?, ?)",
      [equipment_id, rate_amount, billing_unit, effective_date],
      callback,
    );
  },


  updateRentalRate: (id, data, callback) => {
    const { equipment_id, rate_amount, billing_unit, effective_date } = data;
    db.query(
      "UPDATE rental_rates SET equipment_id = ?, rate_amount = ?, billing_unit = ?, effective_date = ? WHERE rate_id = ?",
      [equipment_id, rate_amount, billing_unit, effective_date, id],
      callback,
    );
  },


  deleteRentalRate: (id, callback) => {
    db.query("DELETE FROM rental_rates WHERE rate_id = ?", [id], callback);
  },
};


module.exports = AuditModel;
