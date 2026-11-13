const Model = require("../models/model");

const Controller = {
  // INVENTORY
  getInventory: (req, res) => {
    Model.getInventory((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getInventoryById: (req, res) => {
    Model.getInventoryById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Inventory item not found" });
      res.status(200).json(results[0]);
    });
  },

  addInventory: (req, res) => {
    const { item_name } = req.body;
    if (!item_name) return res.status(400).json({ message: "item_name is required" });
    Model.addInventory(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Inventory item added successfully", id: results.insertId });
    });
  },

  updateInventory: (req, res) => {
    const { item_name } = req.body;
    if (!item_name) return res.status(400).json({ message: "item_name is required" });
    Model.updateInventory(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Inventory item not found" });
      res.status(200).json({ message: "Inventory item updated successfully" });
    });
  },

  deleteInventory: (req, res) => {
    Model.deleteInventory(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Inventory item not found" });
      res.status(200).json({ message: "Inventory item deleted successfully" });
    });
  },

  // PRODUCT INGREDIENTS
  getProductIngredients: (req, res) => {
    Model.getProductIngredients((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getProductIngredientById: (req, res) => {
    Model.getProductIngredientById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Product ingredient not found" });
      res.status(200).json(results[0]);
    });
  },

  addProductIngredient: (req, res) => {
    const { product_id, inventory_id, quantity_required } = req.body;
    if (product_id == null || inventory_id == null || quantity_required == null) {
      return res.status(400).json({ message: "product_id, inventory_id, and quantity_required are required" });
    }
    Model.addProductIngredient(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Product ingredient added successfully", id: results.insertId });
    });
  },

  updateProductIngredient: (req, res) => {
    const { product_id, inventory_id, quantity_required } = req.body;
    if (product_id == null || inventory_id == null || quantity_required == null) {
      return res.status(400).json({ message: "product_id, inventory_id, and quantity_required are required" });
    }
    Model.updateProductIngredient(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Product ingredient not found" });
      res.status(200).json({ message: "Product ingredient updated successfully" });
    });
  },

  deleteProductIngredient: (req, res) => {
    Model.deleteProductIngredient(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Product ingredient not found" });
      res.status(200).json({ message: "Product ingredient deleted successfully" });
    });
  },

  // STOCK MOVEMENTS
  getStockMovements: (req, res) => {
    Model.getStockMovements((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getStockMovementById: (req, res) => {
    Model.getStockMovementById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Stock movement not found" });
      res.status(200).json(results[0]);
    });
  },

  addStockMovement: (req, res) => {
    const { inventory_id, user_id, movement_type, quantity, movement_date } = req.body;
    if (inventory_id == null || user_id == null || !movement_type || quantity == null || !movement_date) {
      return res.status(400).json({ message: "inventory_id, user_id, movement_type, quantity, and movement_date are required" });
    }
    Model.addStockMovement(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Stock movement added successfully", id: results.insertId });
    });
  },

  updateStockMovement: (req, res) => {
    const { inventory_id, user_id, movement_type, quantity, movement_date } = req.body;
    if (inventory_id == null || user_id == null || !movement_type || quantity == null || !movement_date) {
      return res.status(400).json({ message: "inventory_id, user_id, movement_type, quantity, and movement_date are required" });
    }
    Model.updateStockMovement(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Stock movement not found" });
      res.status(200).json({ message: "Stock movement updated successfully" });
    });
  },

  deleteStockMovement: (req, res) => {
    Model.deleteStockMovement(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: "Stock movement not found" });
      res.status(200).json({ message: "Stock movement deleted successfully" });
    });
  }
};

module.exports = Controller;
