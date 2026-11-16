const db = require("../config/db");

const Model = {
  // INVENTORY CRUD
  getInventory: (callback) => {
    db.query("SELECT * FROM inventory ORDER BY inventory_id DESC", callback);
  },

  getInventoryById: (id, callback) => {
    db.query("SELECT * FROM inventory WHERE inventory_id = ?", [id], callback);
  },

  addInventory: (data, callback) => {
    const sql = `
      INSERT INTO inventory (item_name, unit, quantity_on_hand, reorder_level)
      VALUES (?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        data.item_name,
        data.unit || null,
        data.quantity_on_hand ?? 0,
        data.reorder_level ?? 0,
      ],
      callback,
    );
  },

  updateInventory: (id, data, callback) => {
    const sql = `
      UPDATE inventory
      SET item_name = ?, unit = ?, quantity_on_hand = ?, reorder_level = ?
      WHERE inventory_id = ?
    `;
    db.query(
      sql,
      [
        data.item_name,
        data.unit || null,
        data.quantity_on_hand ?? 0,
        data.reorder_level ?? 0,
        id,
      ],
      callback,
    );
  },

  deleteInventory: (id, callback) => {
    db.query("DELETE FROM inventory WHERE inventory_id = ?", [id], callback);
  },

  // LOW STOCK ITEMS
  getLowStock: (callback) => {
    const sql = `
      SELECT inventory_id, item_name, unit, quantity_on_hand, reorder_level
      FROM inventory
      WHERE quantity_on_hand <= reorder_level
      ORDER BY quantity_on_hand ASC
    `;
    db.query(sql, callback);
  },

  // STOCK ALERTS LOG
  getStockAlerts: (callback) => {
    const sql = `
      SELECT sa.alert_id, sa.inventory_id, i.item_name, sa.alert_date, sa.alert_message, sa.alert_status
      FROM stock_alerts sa
      INNER JOIN inventory i ON sa.inventory_id = i.inventory_id
      ORDER BY sa.alert_date DESC
    `;
    db.query(sql, callback);
  },

  // PRODUCT INGREDIENTS CRUD
  getProductIngredients: (callback) => {
    const sql = `
      SELECT pi.recipe_id, pi.product_id, pi.inventory_id, pi.quantity_required,
             p.product_name, i.item_name
      FROM product_ingredients pi
      LEFT JOIN products p ON pi.product_id = p.product_id
      LEFT JOIN inventory i ON pi.inventory_id = i.inventory_id
      ORDER BY pi.recipe_id DESC
    `;
    db.query(sql, callback);
  },

  getProductIngredientById: (id, callback) => {
    db.query(
      "SELECT * FROM product_ingredients WHERE recipe_id = ?",
      [id],
      callback,
    );
  },

  addProductIngredient: (data, callback) => {
    const sql = `
      INSERT INTO product_ingredients (product_id, inventory_id, quantity_required)
      VALUES (?, ?, ?)
    `;
    db.query(
      sql,
      [data.product_id, data.inventory_id, data.quantity_required],
      callback,
    );
  },

  updateProductIngredient: (id, data, callback) => {
    const sql = `
      UPDATE product_ingredients
      SET product_id = ?, inventory_id = ?, quantity_required = ?
      WHERE recipe_id = ?
    `;
    db.query(
      sql,
      [data.product_id, data.inventory_id, data.quantity_required, id],
      callback,
    );
  },

  deleteProductIngredient: (id, callback) => {
    db.query(
      "DELETE FROM product_ingredients WHERE recipe_id = ?",
      [id],
      callback,
    );
  },
};

module.exports = Model;
