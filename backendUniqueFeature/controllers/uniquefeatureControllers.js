const Model = require("../models/uniquefeatureModels");

const Controller = {
  getInventory: (req, res) => {
    Model.getInventory((err, results) => {
      if (err) {
        console.error("SQL Error in getInventory:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results || []);
    });
  },

  getInventoryById: (req, res) => {
    Model.getInventoryById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res.status(404).json({ message: "Inventory item not found" });
      res.status(200).json(results[0]);
    });
  },

  addInventory: (req, res) => {
    if (!req.body.item_name)
      return res.status(400).json({ message: "item_name is required" });
    Model.addInventory(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Inventory item added successfully",
        id: results.insertId,
      });
    });
  },

  updateInventory: (req, res) => {
    if (!req.body.item_name)
      return res.status(400).json({ message: "item_name is required" });
    Model.updateInventory(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Inventory item updated successfully" });
    });
  },

  deleteInventory: (req, res) => {
    Model.deleteInventory(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Inventory item deleted successfully" });
    });
  },

  getLowStock: (req, res) => {
    Model.getLowStock((err, results) => {
      if (err) {
        console.error("SQL Error in getLowStock:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results || []);
    });
  },

  getStockAlerts: (req, res) => {
    Model.getStockAlerts((err, results) => {
      if (err) {
        console.error("SQL Error in getStockAlerts:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results || []);
    });
  },

  getProductIngredients: (req, res) => {
    Model.getProductIngredients((err, results) => {
      if (err) {
        console.error("SQL Error in getProductIngredients:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results || []);
    });
  },

  getProductIngredientById: (req, res) => {
    Model.getProductIngredientById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results || results.length === 0)
        return res
          .status(404)
          .json({ message: "Product ingredient not found" });
      res.status(200).json(results[0]);
    });
  },

  addProductIngredient: (req, res) => {
    const { product_id, inventory_id, quantity_required } = req.body;
    if (
      product_id == null ||
      inventory_id == null ||
      quantity_required == null
    ) {
      return res.status(400).json({
        message: "product_id, inventory_id, and quantity_required are required",
      });
    }
    Model.addProductIngredient(req.body, (err, results) => {
      if (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2" || err.errno === 1452) {
          return res.status(400).json({
            error:
              "Selected Product ID or Inventory ID does not exist in database",
          });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Product ingredient added successfully",
        id: results.insertId,
      });
    });
  },

  updateProductIngredient: (req, res) => {
    Model.updateProductIngredient(req.params.id, req.body, (err, results) => {
      if (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2" || err.errno === 1452) {
          return res.status(400).json({
            error:
              "Selected Product ID or Inventory ID does not exist in database",
          });
        }
        return res.status(500).json({ error: err.message });
      }
      res
        .status(200)
        .json({ message: "Product ingredient updated successfully" });
    });
  },

  deleteProductIngredient: (req, res) => {
    Model.deleteProductIngredient(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ message: "Product ingredient deleted successfully" });
    });
  },
};

module.exports = Controller;
