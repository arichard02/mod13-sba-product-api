import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// create a product
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found"});
        res.json(product);
} catch (error) {
    res.status(400).json({ message: "Invalid product ID"});
    }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// delete product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
});


// filter query
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    let sort = {};
    if (sortBy) {
      const [field, order] = sortBy.split("_");
      sort[field] = order === "asc" ? 1 : -1;
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;