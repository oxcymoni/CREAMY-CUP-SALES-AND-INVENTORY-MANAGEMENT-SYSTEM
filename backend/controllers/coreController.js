const CoreModel = require("../models/coreModel");

const CoreController = {
  // --- AUTHENTICATION ---
  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    CoreModel.findByUsername(username, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];

      if (user.status !== "Active") {
        return res.status(403).json({ error: "User account is inactive" });
      }

      // Check plain text password against stored password hash
      if (user.password_hash !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Successful authentication response
      res.status(200).json({
        message: "Login successful",
        user: {
          user_id: user.user_id,
          username: user.username,
          role: user.role,
          employee_id: user.employee_id,
          first_name: user.first_name,
          last_name: user.last_name
        }
      });
    });
  },

  // --- USER MANAGEMENT ---
  getUsers: (req, res) => {
    CoreModel.getAllUsersWithEmployees((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getUserById: (req, res) => {
    CoreModel.getUserById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(results[0]);
    });
  },

  createUser: (req, res) => {
    const { employee_id, username, password, role, status } = req.body;

    if (!employee_id || !username || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    CoreModel.createUser(
      { employee_id, username, password_hash: password, role, status },
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          message: "User account created successfully",
          user_id: results.insertId
        });
      }
    );
  },

  updateUser: (req, res) => {
    CoreModel.updateUser(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User account updated successfully" });
    });
  },

  deleteUser: (req, res) => {
    CoreModel.deleteUser(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    });
  }
};

module.exports = CoreController;