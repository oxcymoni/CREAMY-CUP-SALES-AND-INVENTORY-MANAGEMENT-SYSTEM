const db = require("../config/db");

const Model = {
  // INVENTORY CRUD
  getInventory: (callback) => {
    db.query("SELECT * FROM Inventory ORDER BY inventory_id DESC", callback);
  },

  getInventoryById: (id, callback) => {
    db.query("SELECT * FROM Inventory WHERE inventory_id = ?", [id], callback);
  },

  addInventory: (data, callback) => {
    const sql = `
      INSERT INTO Inventory (item_name, unit, quantity_on_hand, reorder_level)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [
      data.item_name,
      data.unit || null,
      data.quantity_on_hand ?? 0,
      data.reorder_level ?? 0
    ], callback);
  },

  updateInventory: (id, data, callback) => {
    const sql = `
      UPDATE Inventory
      SET item_name = ?, unit = ?, quantity_on_hand = ?, reorder_level = ?
      WHERE inventory_id = ?
    `;
    db.query(sql, [
      data.item_name,
      data.unit || null,
      data.quantity_on_hand ?? 0,
      data.reorder_level ?? 0,
      id
    ], callback);
  },

  deleteInventory: (id, callback) => {
    db.query("DELETE FROM Inventory WHERE inventory_id = ?", [id], callback);
  },

  // PRODUCT INGREDIENTS CRUD
  getProductIngredients: (callback) => {
    db.query("SELECT * FROM Product_Ingredients ORDER BY recipe_id DESC", callback);
  },

  getProductIngredientById: (id, callback) => {
    db.query("SELECT * FROM Product_Ingredients WHERE recipe_id = ?", [id], callback);
  },

  addProductIngredient: (data, callback) => {
    const sql = `
      INSERT INTO Product_Ingredients
      (product_id, inventory_id, quantity_required)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [
      data.product_id,
      data.inventory_id,
      data.quantity_required
    ], callback);
  },

  updateProductIngredient: (id, data, callback) => {
    const sql = `
      UPDATE Product_Ingredients
      SET product_id = ?, inventory_id = ?, quantity_required = ?
      WHERE recipe_id = ?
    `;
    db.query(sql, [
      data.product_id,
      data.inventory_id,
      data.quantity_required,
      id
    ], callback);
  },

  deleteProductIngredient: (id, callback) => {
    db.query("DELETE FROM Product_Ingredients WHERE recipe_id = ?", [id], callback);
  },

  // STOCK MOVEMENTS CRUD
  getStockMovements: (callback) => {
    db.query("SELECT * FROM Stock_Movements ORDER BY movement_id DESC", callback);
  },

  getStockMovementById: (id, callback) => {
    db.query("SELECT * FROM Stock_Movements WHERE movement_id = ?", [id], callback);
  },

  addStockMovement: (data, callback) => {
    const sql = `
      INSERT INTO Stock_Movements
      (inventory_id, user_id, movement_type, quantity, movement_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      data.inventory_id,
      data.user_id,
      data.movement_type,
      data.quantity,
      data.movement_date
    ], callback);
  },

  updateStockMovement: (id, data, callback) => {
    const sql = `
      UPDATE Stock_Movements
      SET inventory_id = ?, user_id = ?, movement_type = ?, quantity = ?, movement_date = ?
      WHERE movement_id = ?
    `;
    db.query(sql, [
      data.inventory_id,
      data.user_id,
      data.movement_type,
      data.quantity,
      data.movement_date,
      id
    ], callback);
  },

  deleteStockMovement: (id, callback) => {
    db.query("DELETE FROM Stock_Movements WHERE movement_id = ?", [id], callback);
  }
};

module.exports = Model;
