const db = require("../config/db");

const MasterDataModel = {
  // --- CATEGORIES ---
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

  // --- PRODUCTS (Includes INNER JOIN with Categories) ---
  getAllProducts: (callback) => {
    const sql = `
      SELECT p.product_id, p.product_name, p.price, p.status, c.category_name
      FROM Products p
      INNER JOIN Categories c ON p.category_id = c.category_id
    `;
    db.query(sql, callback);
  },
  getProductById: (id, callback) => {
    db.query("SELECT * FROM Products WHERE product_id = ?", [id], callback);
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

  // --- CUSTOMERS ---
  getAllCustomers: (callback) => {
    db.query("SELECT * FROM Customers", callback);
  },
  createCustomer: (data, callback) => {
    const { customer_name, contact_number } = data;
    db.query(
      "INSERT INTO Customers (customer_name, contact_number) VALUES (?, ?)",
      [customer_name, contact_number],
      callback,
    );
  },
  updateCustomer: (id, data, callback) => {
    const { customer_name, contact_number } = data;
    db.query(
      "UPDATE Customers SET customer_name = ?, contact_number = ? WHERE customer_id = ?",
      [customer_name, contact_number, id],
      callback,
    );
  },
  deleteCustomer: (id, callback) => {
    db.query("DELETE FROM Customers WHERE customer_id = ?", [id], callback);
  },

  // --- SUPPLIERS ---
  getAllSuppliers: (callback) => {
    db.query("SELECT * FROM Suppliers", callback);
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

  // --- EMPLOYEES ---
  getAllEmployees: (callback) => {
    db.query("SELECT * FROM Employees", callback);
  },
  createEmployee: (data, callback) => {
    const { first_name, last_name, position, contact_number } = data;
    db.query(
      "INSERT INTO Employees (first_name, last_name, position, contact_number) VALUES (?, ?, ?, ?)",
      [first_name, last_name, position, contact_number],
      callback,
    );
  },

  // --- RENTAL EQUIPMENT ---
  getAllEquipment: (callback) => {
    db.query("SELECT * FROM Rental_Equipment", callback);
  },
  createEquipment: (data, callback) => {
    const { equipment_name, equipment_type, status } = data;
    db.query(
      "INSERT INTO Rental_Equipment (equipment_name, equipment_type, status) VALUES (?, ?, ?)",
      [equipment_name, equipment_type, status],
      callback,
    );
  },
};

module.exports = MasterDataModel;
