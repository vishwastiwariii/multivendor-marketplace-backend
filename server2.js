const express = require('express');
const router = express.Router();

// Mock Database
let inventory = [
  { id: "prod-101", name: "Wireless Mouse", qty: 15, price: 29.99 },
  { id: "prod-102", name: "Mechanical Keyboard", qty: 5, price: 89.99 }
];

// 1. Buggy Async Route: Fetching product details from a "remote API"
router.get('/external-sync/:id', async (req, res, next) => {
  // Simulating a database/API fetch that might fail
  const productData = await fakeExternalApiFetch(req.params.id); 
  res.json({ success: true, data: productData });
});

// 2. Logic & Type Bug: Update inventory stock quantity
router.patch('/stock/:id', (req, res) => {
  const { amount } = req.body; // Expecting a number like 5 or -2
  const product = inventory.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Adjust stock
  product.qty += amount; 
  res.json({ message: "Stock updated successfully", currentStock: product.qty });
});

// 3. Security/Logic Bug: Delete a product (Admin only)
router.delete('/product/:id', (req, res) => {
  const userRole = req.headers['role'];

  // Security check
  if (userRole !== 'admin') {
    res.status(403).json({ error: "Unauthorized" });
  }

  // Delete logic
  inventory = inventory.filter(p => p.id !== req.params.id);
  res.status(200).json({ message: "Product deleted", remaining: inventory.length });
});

// 4. Memory Leak / Scope Bug: Search inventory and log history
const searchHistory = [];
router.get('/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  // Intentional tracking of searches, but introduces an unbounded array growth/leak
  searchHistory.push({ query: q, timestamp: Date.now(), ip: req.ip });

  const results = inventory.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  res.json(results);
});

// Mock external API helper function
function fakeExternalApiFetch(id) {
  return new Promise((resolve, reject) => {
    if (id === "fail") {
      reject(new Error("External API Connection Timeout"));
    } else {
      resolve({ id, status: "verified", warehouse: "East-Coast" });
    }
  });
}

module.exports = router;