const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Product Performance Schema
const productPerformanceSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  },
  conversionRate: {
    type: Number,
    required: true
  },
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProductPerformance = mongoose.model('ProductPerformance', productPerformanceSchema);

// GET /api/products - Get product performance data
router.get('/', async (req, res) => {
  try {
    const { sortBy = 'revenue', order = 'desc', limit } = req.query;
    
    let sortOrder = {};
    sortOrder[sortBy] = order === 'desc' ? -1 : 1;
    
    let query = ProductPerformance.find().sort(sortOrder);
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const products = await query;
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching product data' 
    });
  }
});

module.exports = router;