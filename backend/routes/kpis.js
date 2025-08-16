const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// KPIs Schema
const kpiSchema = new mongoose.Schema({
  ecommerceRevenue: {
    type: Number,
    required: true
  },
  newCustomers: {
    type: Number,
    required: true
  },
  repeatPurchaseRate: {
    type: Number,
    required: true
  },
  averageOrderValue: {
    type: Number,
    required: true
  },
  ecommerceConversionRate: {
    type: Number,
    required: true
  },
  dateRange: {
    start: Date,
    end: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const KPI = mongoose.model('KPI', kpiSchema);

// GET /api/kpis - Get KPI data
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    
    // If date range is provided, filter by it
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    // Get the most recent KPI data
    const kpis = await KPI.findOne(query).sort({ createdAt: -1 });
    
    if (!kpis) {
      return res.status(404).json({ message: 'No KPI data found' });
    }
    
    res.json({
      success: true,
      data: {
        ecommerceRevenue: kpis.ecommerceRevenue,
        newCustomers: kpis.newCustomers,
        repeatPurchaseRate: kpis.repeatPurchaseRate,
        averageOrderValue: kpis.averageOrderValue,
        ecommerceConversionRate: kpis.ecommerceConversionRate
      }
    });
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching KPIs' 
    });
  }
});

// POST /api/kpis - Create new KPI data (for future use)
router.post('/', async (req, res) => {
  try {
    const kpi = new KPI(req.body);
    await kpi.save();
    
    res.status(201).json({
      success: true,
      data: kpi,
      message: 'KPI data created successfully'
    });
  } catch (error) {
    console.error('Error creating KPI:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error creating KPI data',
      error: error.message 
    });
  }
});

module.exports = router;