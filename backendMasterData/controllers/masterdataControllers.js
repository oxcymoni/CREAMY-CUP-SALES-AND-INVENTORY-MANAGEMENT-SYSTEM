const MasterDataModel = require("../models/masterDataModel");

const MasterDataController = {
  // --- CATEGORIES ---
  getCategories: (req, res) => {
    MasterDataModel.getAllCategories((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  createCategory: (req, res) => {
    MasterDataModel.createCategory(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Category created successfully",
        id: results.insertId,
      });
    });
  },
  updateCategory: (req, res) => {
    MasterDataModel.updateCategory(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Category updated successfully" });
    });
  },
  deleteCategory: (req, res) => {
    MasterDataModel.deleteCategory(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Category deleted successfully" });
    });
  },

  // --- PRODUCTS ---
  getProducts: (req, res) => {
    MasterDataModel.getAllProducts((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  createProduct: (req, res) => {
    MasterDataModel.createProduct(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Product created successfully",
        id: results.insertId,
      });
    });
  },
  updateProduct: (req, res) => {
    MasterDataModel.updateProduct(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Product updated successfully" });
    });
  },
  deleteProduct: (req, res) => {
    MasterDataModel.deleteProduct(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Product deleted successfully" });
    });
  },

  // --- CUSTOMERS ---
  getCustomers: (req, res) => {
    MasterDataModel.getAllCustomers((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  createCustomer: (req, res) => {
    MasterDataModel.createCustomer(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Customer created successfully",
        id: results.insertId,
      });
    });
  },

  // --- SUPPLIERS ---
  getSuppliers: (req, res) => {
    MasterDataModel.getAllSuppliers((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  createSupplier: (req, res) => {
    MasterDataModel.createSupplier(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Supplier created successfully",
        id: results.insertId,
      });
    });
  },
};

module.exports = MasterDataController;
