const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Revenue Over Time Schema
const revenueOverTimeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  },
  conversionRate: {
    type: Number,
    required: true
  }
});

const RevenueOverTime = mongoose.model('RevenueOverTime', revenueOverTimeSchema);

// GET /api/revenue - Get revenue over time data
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    
    // If date range is provided, filter by it
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const revenueData = await RevenueOverTime.find(query).sort({ date: 1 });
    
    res.json({
      success: true,
      data: revenueData
    });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching revenue data' 
    });
  }
});

module.exports = router;