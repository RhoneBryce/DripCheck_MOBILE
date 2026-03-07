const express = require('express');
const router = express.Router();
const Clothing = require('../models/Clothing');

// GET all clothing items
router.get('/', async (req, res) => {
  try {
    const items = await Clothing.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('GET /api/clothing error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST create clothing item
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/clothing body:', req.body);

    const item = new Clothing(req.body);
    const savedItem = await item.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error('POST /api/clothing error:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update clothing item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Clothing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('PUT /api/clothing/:id error:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE clothing item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Clothing.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }

    res.json({ message: 'Clothing item deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/clothing/:id error:', error);
    res.status(500).json({ message: error.message });
  }
});

// PATCH favorite
router.patch('/:id/favorite', async (req, res) => {
  try {
    const updatedItem = await Clothing.findByIdAndUpdate(
      req.params.id,
      { favorite: req.body.favorite },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('PATCH /api/clothing/:id/favorite error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;