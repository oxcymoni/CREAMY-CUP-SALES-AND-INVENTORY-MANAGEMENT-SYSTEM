const db = require("../config/db");

const CoreModel = {
  // --- AUTHENTICATION ---
  // Find a user by username to verify credentials during login
  findByUsername: (username, callback) => {
    const sql = `
      SELECT u.user_id, u.employee_id, u.username, u.password_hash, u.role, u.status,
             e.first_name, e.last_name
      FROM Users u
      INNER JOIN Employees e ON u.employee_id = e.employee_id
      WHERE u.username = ?
    `;
    db.query(sql, [username], callback);
  },

  // --- USER MANAGEMENT ---
  // INNER JOIN query combining Users with Employees data
  getAllUsersWithEmployees: (callback) => {
    const sql = `
      SELECT u.user_id, u.username, u.role, u.status,
             e.employee_id, e.first_name, e.last_name, e.position, e.contact_number
      FROM Users u
      INNER JOIN Employees e ON u.employee_id = e.employee_id
      ORDER BY u.user_id DESC
    `;
    db.query(sql, callback);
  },

  getUserById: (id, callback) => {
    const sql = `
      SELECT u.user_id, u.username, u.role, u.status,
             e.employee_id, e.first_name, e.last_name, e.position, e.contact_number
      FROM Users u
      INNER JOIN Employees e ON u.employee_id = e.employee_id
      WHERE u.user_id = ?
    `;
    db.query(sql, [id], callback);
  },

  createUser: (userData, callback) => {
    const { employee_id, username, password_hash, role, status } = userData;
    const sql = `
      INSERT INTO Users (employee_id, username, password_hash, role, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [employee_id, username, password_hash, role, status || "Active"], callback);
  },

  updateUser: (id, userData, callback) => {
    const { username, role, status } = userData;
    const sql = `
      UPDATE Users
      SET username = ?, role = ?, status = ?
      WHERE user_id = ?
    `;
    db.query(sql, [username, role, status, id], callback);
  },

  updatePassword: (id, password_hash, callback) => {
    const sql = 'UPDATE Users SET password_hash = ? WHERE user_id = ?';
    db.query(sql, [password_hash, id], callback);
  },

  deleteUser: (id, callback) => {
    const sql = 'DELETE FROM Users WHERE user_id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = CoreModel;