# E-commerce Analytics Dashboard

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that provides comprehensive e-commerce analytics with interactive charts, KPI tracking, and real-time data visualization.

## Features

- **Interactive Dashboard**: Real-time KPI tracking and analytics
- **Dynamic Charts**: Revenue trends, product performance, marketing channels
- **Geographic Visualization**: State-wise revenue mapping
- **Responsive Design**: Works seamlessly on desktop and tablets
- **Real-time Filters**: Date range, KPI selectors, and breakdown options
- **RESTful API**: Clean, scalable backend architecture

## Key Metrics Tracked

- E-commerce Revenue
- New Customers
- Repeat Purchase Rate
- Average Order Value
- Conversion Rates
- Product Performance
- Marketing Channel Effectiveness
- Geographic Revenue Distribution
- Device-based Analytics

## Tech Stack

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM library

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-dashboard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file in backend folder:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/ecommerce-dashboard
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```
   
   Seed the database and start server:
   ```bash
   npm run seed
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
ecommerce-dashboard/
├── backend/                 # Express.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── scripts/            # Database seeding
│   └── server.js           # Entry point
└── frontend/               # React.js application
    ├── src/
    │   ├── components/     # React components
    │   ├── store/          # Redux store
    │   ├── services/       # API services
    │   └── utils/          # Helper functions
    └── public/             # Static assets
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Populate database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

- `GET /api/kpis` - Key performance indicators
- `GET /api/revenue` - Revenue over time data
- `GET /api/products` - Product performance metrics
- `GET /api/marketing` - Marketing channel analytics
- `GET /api/states` - Geographic revenue data
- `GET /api/devices` - Device-based performance

## Deployment

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Deploy automatically

### Database (MongoDB Atlas)
1. Create a cluster
2. Update MONGODB_URI in environment variables

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
FRONTEND_URL=your_frontend_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Challenge provided as part of MERN stack development assessment by DevNuts (https://devnuts.org)
- Sample data structure and requirements from the original challenge document
- Built with modern web development best practices

## Contact

Laiba Nadeem - miss.laiba.nadeem@gmail.com
Project Link: [https://github.com/laibulous/Ecommerce-dashboard](https://github.com/laibulous/Ecommerce-dashboard)