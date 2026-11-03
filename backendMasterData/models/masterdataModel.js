const db = require("../config/db");

const MasterDataModel = {
  getAllSuppliers: (callback) => {
    db.query("SELECT * FROM Suppliers", callback);
  },
  getSupplierById: (id, callback) => {
    db.query("SELECT * FROM Suppliers WHERE supplier_id = ?", [id], callback);
  },
  createSupplier: (data, callback) => {
    const { supplier_name, contact_number, address } = data;
    db.query(
      "INSERT INTO Suppliers (supplier_name, contact_number, address) VALUES (?, ?, ?)",
      [supplier_name, contact_number, address],
      callback,
    );
  },
  updateSupplier: (id, data, callback) => {
    const { supplier_name, contact_number, address } = data;
    db.query(
      "UPDATE Suppliers SET supplier_name = ?, contact_number = ?, address = ? WHERE supplier_id = ?",
      [supplier_name, contact_number, address, id],
      callback,
    );
  },
  deleteSupplier: (id, callback) => {
    db.query("DELETE FROM Suppliers WHERE supplier_id = ?", [id], callback);
  },

  getAllCategories: (callback) => {
    db.query("SELECT * FROM Categories", callback);
  },
  getCategoryById: (id, callback) => {
    db.query("SELECT * FROM Categories WHERE category_id = ?", [id], callback);
  },
  createCategory: (data, callback) => {
    const { category_name, description } = data;
    db.query(
      "INSERT INTO Categories (category_name, description) VALUES (?, ?)",
      [category_name, description],
      callback,
    );
  },
  updateCategory: (id, data, callback) => {
    const { category_name, description } = data;
    db.query(
      "UPDATE Categories SET category_name = ?, description = ? WHERE category_id = ?",
      [category_name, description, id],
      callback,
    );
  },
  deleteCategory: (id, callback) => {
    db.query("DELETE FROM Categories WHERE category_id = ?", [id], callback);
  },

  getAllProducts: (callback) => {
    const sql = `
      SELECT p.product_id, p.product_name, p.price, p.status, c.category_id, c.category_name
      FROM Products p
      INNER JOIN Categories c ON p.category_id = c.category_id
    `;
    db.query(sql, callback);
  },
  getProductById: (id, callback) => {
    const sql = `
      SELECT p.product_id, p.product_name, p.price, p.status, c.category_id, c.category_name
      FROM Products p
      INNER JOIN Categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `;
    db.query(sql, [id], callback);
  },
  createProduct: (data, callback) => {
    const { category_id, product_name, price, status } = data;
    db.query(
      "INSERT INTO Products (category_id, product_name, price, status) VALUES (?, ?, ?, ?)",
      [category_id, product_name, price, status],
      callback,
    );
  },
  updateProduct: (id, data, callback) => {
    const { category_id, product_name, price, status } = data;
    db.query(
      "UPDATE Products SET category_id = ?, product_name = ?, price = ?, status = ? WHERE product_id = ?",
      [category_id, product_name, price, status, id],
      callback,
    );
  },
  deleteProduct: (id, callback) => {
    db.query("DELETE FROM Products WHERE product_id = ?", [id], callback);
  },

  getAllEmployees: (callback) => {
    db.query("SELECT * FROM employees", callback);
  },
  getEmployeeById: (id, callback) => {
    db.query("SELECT * FROM employees WHERE employee_id = ?", [id], callback);
  },
  createEmployee: (data, callback) => {
    const { first_name, last_name, position, contact_number, status } = data;
    db.query(
      "INSERT INTO employees (first_name, last_name, position, contact_number, status) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, position, contact_number, status || "Active"],
      callback,
    );
  },
  updateEmployee: (id, data, callback) => {
    const { first_name, last_name, position, contact_number, status } = data;
    db.query(
      "UPDATE employees SET first_name = ?, last_name = ?, position = ?, contact_number = ?, status = ? WHERE employee_id = ?",
      [first_name, last_name, position, contact_number, status || "Active", id],
      callback,
    );
  },
  deleteEmployee: (id, callback) => {
    db.query("DELETE FROM employees WHERE employee_id = ?", [id], callback);
  },
};

module.exports = MasterDataModel;
