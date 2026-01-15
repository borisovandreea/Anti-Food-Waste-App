const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) { next(err); }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
});

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const payload = req.body;
    const created = await Product.create(payload);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    await p.update(req.body);
    res.json(p);
  } catch (err) { next(err); }
});

// PATCH /api/products/:id/share -> toggle shareable
router.patch('/:id/share', async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    p.shareable = req.body.shareable === undefined ? !p.shareable : !!req.body.shareable;
    await p.save();
    res.json(p);
  } catch (err) { next(err); }
});

/**
 * PATCH /api/products/:id
 * Updates a product's claimedBy field to mark it as claimed
 * Accepts claimedBy in request body (defaults to "Student User" if not provided)
 * Returns the updated product as JSON
 */
router.patch('/:id', async (req, res, next) => {
  try {
    console.log(`📝 DEBUG: PATCH request for product ID ${req.params.id}`);
    console.log(`📝 DEBUG: Request body:`, req.body);

    // Find the product by ID
    const productToUpdate = await Product.findByPk(req.params.id);

    // Check if product exists
    if (!productToUpdate) {
      console.warn(`⚠️ DEBUG: Product ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Product not found' });
    }

    // Extract claimedBy from request body, default to "Student User"
    const claimedByValue = req.body.claimedBy || 'Student User';

    // Update the product's claimedBy field
    productToUpdate.claimedBy = claimedByValue;
    await productToUpdate.save();

    console.log(`✅ DEBUG: Product ID ${req.params.id} successfully updated with claimedBy: "${claimedByValue}"`);

    // Return the updated product
    res.json(productToUpdate);
  } catch (databaseError) {
    console.error(`❌ DEBUG: Error updating product ID ${req.params.id}:`, databaseError);
    next(databaseError);
  }
});

// POST /api/products/:id/claim
router.post('/:id/claim', async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    if (!p.shareable) return res.status(400).json({ error: 'Product not shareable' });
    if (p.claimedBy) return res.status(400).json({ error: 'Already claimed' });
    const claimer = req.body.claimer || 'anonymous';
    p.claimedBy = claimer;
    p.shareable = false;
    await p.save();
    res.json(p);
  } catch (err) { next(err); }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    await p.destroy();
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
