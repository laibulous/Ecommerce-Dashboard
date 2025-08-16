const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// State Performance Schema
const statePerformanceSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  },
  stateCode: String,
  region: String
});

const StatePerformance = mongoose.model('StatePerformance', statePerformanceSchema);

// GET /api/states - Get state performance data
router.get('/', async (req, res) => {
  try {
    const { sortBy = 'revenue', order = 'desc' } = req.query;
    
    let sortOrder = {};
    sortOrder[sortBy] = order === 'desc' ? -1 : 1;
    
    const states = await StatePerformance.find().sort(sortOrder);
    
    res.json({
      success: true,
      data: states
    });
  } catch (error) {
    console.error('Error fetching state data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching state data' 
    });
  }
});

module.exports = router;