const mongoose = require('mongoose');
require('dotenv').config();

// Define schemas directly here
const kpiSchema = new mongoose.Schema({
  ecommerceRevenue: { type: Number, required: true },
  newCustomers: { type: Number, required: true },
  repeatPurchaseRate: { type: Number, required: true },
  averageOrderValue: { type: Number, required: true },
  ecommerceConversionRate: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const revenueOverTimeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  revenue: { type: Number, required: true },
  conversionRate: { type: Number, required: true }
});

const productPerformanceSchema = new mongoose.Schema({
  product: { type: String, required: true },
  revenue: { type: Number, required: true },
  conversionRate: { type: Number, required: true }
});

const marketingChannelSchema = new mongoose.Schema({
  channel: { type: String, required: true },
  revenue: { type: Number, required: true },
  conversionRate: { type: Number, required: true }
});

const statePerformanceSchema = new mongoose.Schema({
  state: { type: String, required: true },
  revenue: { type: Number, required: true }
});

const devicePerformanceSchema = new mongoose.Schema({
  device: { type: String, required: true },
  revenue: { type: Number, required: true },
  conversionRate: { type: Number, required: true }
});

// Create models
const KPI = mongoose.model('KPI', kpiSchema);
const RevenueOverTime = mongoose.model('RevenueOverTime', revenueOverTimeSchema);
const ProductPerformance = mongoose.model('ProductPerformance', productPerformanceSchema);
const MarketingChannel = mongoose.model('MarketingChannel', marketingChannelSchema);
const StatePerformance = mongoose.model('StatePerformance', statePerformanceSchema);
const DevicePerformance = mongoose.model('DevicePerformance', devicePerformanceSchema);

// Sample data from the challenge
const sampleData = {
  kpis: {
    ecommerceRevenue: 268277,
    newCustomers: 198,
    repeatPurchaseRate: 67.54,
    averageOrderValue: 402.21,
    ecommerceConversionRate: 1.27
  },
  revenueOverTime: [
    { "date": "2025-04-01", "revenue": 5000, "conversionRate": 0.06 },
    { "date": "2025-04-08", "revenue": 8500, "conversionRate": 0.08 },
    { "date": "2025-04-15", "revenue": 12000, "conversionRate": 0.07 },
    { "date": "2025-04-22", "revenue": 18000, "conversionRate": 0.12 },
    { "date": "2025-05-01", "revenue": 15000, "conversionRate": 0.10 },
    { "date": "2025-05-08", "revenue": 23000, "conversionRate": 0.15 },
    { "date": "2025-05-15", "revenue": 17000, "conversionRate": 0.11 },
    { "date": "2025-05-22", "revenue": 14000, "conversionRate": 0.09 },
    { "date": "2025-06-29", "revenue": 25000, "conversionRate": 0.13 },
    { "date": "2025-06-05", "revenue": 20000, "conversionRate": 0.11 }
  ],
  productPerformance: [
    { "product": "Product 1", "revenue": 29503, "conversionRate": 1.53 },
    { "product": "Product 2", "revenue": 67557, "conversionRate": 1.47 },
    { "product": "Product 3", "revenue": 30869, "conversionRate": 1.53 },
    { "product": "Product 4", "revenue": 40404, "conversionRate": 1.46 },
    { "product": "Product 5", "revenue": 77044, "conversionRate": 1.42 }
  ],
  marketingChannels: [
    { "channel": "AdRoll", "revenue": 56115, "conversionRate": 1.45 },
    { "channel": "LinkedIn Ads", "revenue": 53221, "conversionRate": 1.53 },
    { "channel": "YouTube Ads", "revenue": 47870, "conversionRate": 1.45 },
    { "channel": "Bing Ads", "revenue": 38219, "conversionRate": 1.54 },
    { "channel": "Google Ads", "revenue": 37643, "conversionRate": 1.45 },
    { "channel": "Facebook Ads", "revenue": 35128, "conversionRate": 1.47 }
  ],
  statePerformance: [
    { "state": "California", "revenue": 72000 },
    { "state": "Texas", "revenue": 55000 },
    { "state": "Florida", "revenue": 48000 },
    { "state": "New York", "revenue": 61000 },
    { "state": "Illinois", "revenue": 32000 },
    { "state": "Pennsylvania", "revenue": 25000 }
  ],
  devicePerformance: [
    { "device": "Desktop", "revenue": 118971, "conversionRate": 1.47 },
    { "device": "Mobile", "revenue": 59041, "conversionRate": 1.37 },
    { "device": "Tablet", "revenue": 89905, "conversionRate": 1.58 }
  ]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-dashboard');
    console.log('Connected to MongoDB');

    // Clear existing data
    await KPI.deleteMany({});
    await RevenueOverTime.deleteMany({});
    await ProductPerformance.deleteMany({});
    await MarketingChannel.deleteMany({});
    await StatePerformance.deleteMany({});
    await DevicePerformance.deleteMany({});
    
    console.log('Cleared existing data');

    // Seed KPIs
    await KPI.create(sampleData.kpis);
    console.log('KPIs seeded');

    // Seed Revenue Over Time
    await RevenueOverTime.insertMany(sampleData.revenueOverTime);
    console.log('Revenue over time seeded');

    // Seed Product Performance
    await ProductPerformance.insertMany(sampleData.productPerformance);
    console.log('Product performance seeded');

    // Seed Marketing Channels
    await MarketingChannel.insertMany(sampleData.marketingChannels);
    console.log('Marketing channels seeded');

    // Seed State Performance
    await StatePerformance.insertMany(sampleData.statePerformance);
    console.log('State performance seeded');

    // Seed Device Performance
    await DevicePerformance.insertMany(sampleData.devicePerformance);
    console.log('Device performance seeded');

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();