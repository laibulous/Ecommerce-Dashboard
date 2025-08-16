const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Device Performance Schema
const devicePerformanceSchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
    enum: ['Desktop', 'Mobile', 'Tablet']
  },
  revenue: {
    type: Number,
    required: true
  },
  conversionRate: {
    type: Number,
    required: true
  },
  sessions: Number,
  users: Number
});

const DevicePerformance = mongoose.model('DevicePerformance', devicePerformanceSchema);

// GET /api/devices - Get device performance data
router.get('/', async (req, res) => {
  try {
    const { sortBy = 'revenue', order = 'desc' } = req.query;
    
    let sortOrder = {};
    sortOrder[sortBy] = order === 'desc' ? -1 : 1;
    
    const devices = await DevicePerformance.find().sort(sortOrder);
    
    res.json({
      success: true,
      data: devices
    });
  } catch (error) {
    console.error('Error fetching device data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching device data' 
    });
  }
});

module.exports = router;