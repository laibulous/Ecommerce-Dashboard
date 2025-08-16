const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schemas directly in server
const kpiSchema = new mongoose.Schema({
  ecommerceRevenue: Number,
  newCustomers: Number,
  repeatPurchaseRate: Number,
  averageOrderValue: Number,
  ecommerceConversionRate: Number,
  createdAt: { type: Date, default: Date.now }
});

const revenueSchema = new mongoose.Schema({
  date: Date,
  revenue: Number,
  conversionRate: Number
});

const productSchema = new mongoose.Schema({
  product: String,
  revenue: Number,
  conversionRate: Number
});

const marketingSchema = new mongoose.Schema({
  channel: String,
  revenue: Number,
  conversionRate: Number
});

const stateSchema = new mongoose.Schema({
  state: String,
  revenue: Number
});

const deviceSchema = new mongoose.Schema({
  device: String,
  revenue: Number,
  conversionRate: Number
});

// Create models
const KPI = mongoose.model('KPI', kpiSchema);
const RevenueOverTime = mongoose.model('RevenueOverTime', revenueSchema);
const ProductPerformance = mongoose.model('ProductPerformance', productSchema);
const MarketingChannel = mongoose.model('MarketingChannel', marketingSchema);
const StatePerformance = mongoose.model('StatePerformance', stateSchema);
const DevicePerformance = mongoose.model('DevicePerformance', deviceSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'E-commerce Dashboard API is running' });
});

app.get('/api/kpis', async (req, res) => {
  try {
    const kpis = await KPI.findOne().sort({ createdAt: -1 });
    if (!kpis) {
      return res.json({
        success: true,
        data: {
          ecommerceRevenue: 268277,
          newCustomers: 198,
          repeatPurchaseRate: 67.54,
          averageOrderValue: 402.21,
          ecommerceConversionRate: 1.27
        }
      });
    }
    res.json({ success: true, data: kpis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/revenue', async (req, res) => {
  try {
    const data = await RevenueOverTime.find().sort({ date: 1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const data = await ProductPerformance.find().sort({ revenue: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/marketing', async (req, res) => {
  try {
    const data = await MarketingChannel.find().sort({ revenue: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/states', async (req, res) => {
  try {
    const data = await StatePerformance.find().sort({ revenue: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/devices', async (req, res) => {
  try {
    const data = await DevicePerformance.find().sort({ revenue: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});