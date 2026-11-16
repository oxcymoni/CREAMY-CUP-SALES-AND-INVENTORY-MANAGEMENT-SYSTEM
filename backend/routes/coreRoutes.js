const express = require("express");
const router = express.Router();
const CoreController = require("../controllers/coreController");

// Authentication Route
router.post("/login", CoreController.login);

// User Management Routes
router.get("/users", CoreController.getUsers);
router.get("/users/:id", CoreController.getUserById);
router.post("/users", CoreController.createUser);
router.put("/users/:id", CoreController.updateUser);
router.delete("/users/:id", CoreController.deleteUser);

module.exports = router;