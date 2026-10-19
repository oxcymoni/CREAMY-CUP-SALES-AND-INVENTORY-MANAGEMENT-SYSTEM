const MasterDataModel = require("../models/masterDataModel");

const MasterDataController = {
  getSuppliers: (req, res) => {
    MasterDataModel.getAllSuppliers((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  getSupplierById: (req, res) => {
    MasterDataModel.getSupplierById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Supplier not found" });
      res.status(200).json(results[0]);
    });
  },
  createSupplier: (req, res) => {
    MasterDataModel.createSupplier(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Supplier created successfully",
        supplier_id: results.insertId,
      });
    });
  },
  updateSupplier: (req, res) => {
    MasterDataModel.updateSupplier(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Supplier not found" });
      res.status(200).json({ message: "Supplier updated successfully" });
    });
  },
  deleteSupplier: (req, res) => {
    MasterDataModel.deleteSupplier(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Supplier not found" });
      res.status(200).json({ message: "Supplier deleted successfully" });
    });
  },

  getCategories: (req, res) => {
    MasterDataModel.getAllCategories((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  getCategoryById: (req, res) => {
    MasterDataModel.getCategoryById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Category not found" });
      res.status(200).json(results[0]);
    });
  },
  createCategory: (req, res) => {
    MasterDataModel.createCategory(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Category created successfully",
        category_id: results.insertId,
      });
    });
  },
  updateCategory: (req, res) => {
    MasterDataModel.updateCategory(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Category not found" });
      res.status(200).json({ message: "Category updated successfully" });
    });
  },
  deleteCategory: (req, res) => {
    MasterDataModel.deleteCategory(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Category not found" });
      res.status(200).json({ message: "Category deleted successfully" });
    });
  },

  getProducts: (req, res) => {
    MasterDataModel.getAllProducts((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
  getProductById: (req, res) => {
    MasterDataModel.getProductById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(results[0]);
    });
  },
  createProduct: (req, res) => {
    MasterDataModel.createProduct(req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Product created successfully",
        product_id: results.insertId,
      });
    });
  },
  updateProduct: (req, res) => {
    MasterDataModel.updateProduct(req.params.id, req.body, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product updated successfully" });
    });
  },
  deleteProduct: (req, res) => {
    MasterDataModel.deleteProduct(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    });
  },
};

module.exports = MasterDataController;
