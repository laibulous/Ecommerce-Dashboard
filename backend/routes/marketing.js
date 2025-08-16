const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Marketing Channels Schema
const marketingChannelSchema = new mongoose.Schema({
  channel: {
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
  cost: Number,
  impressions: Number,
  clicks: Number
});

const MarketingChannel = mongoose.model('MarketingChannel', marketingChannelSchema);

// GET /api/marketing - Get marketing channel performance data
router.get('/', async (req, res) => {
  try {
    const { sortBy = 'revenue', order = 'desc' } = req.query;
    
    let sortOrder = {};
    sortOrder[sortBy] = order === 'desc' ? -1 : 1;
    
    const channels = await MarketingChannel.find().sort(sortOrder);
    
    res.json({
      success: true,
      data: channels
    });
  } catch (error) {
    console.error('Error fetching marketing data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching marketing data' 
    });
  }
});

module.exports = router;