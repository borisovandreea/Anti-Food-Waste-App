/**
 * Anti-Food Waste App - Express Application Configuration
 * Sets up middleware, routes, and error handling
 * Production-ready configuration for deployment
 */

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const recipeRoutes = require('./routes/recipes');

const app = express();

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 * Allows the frontend (running on a different domain/port) to communicate with this backend
 * 
 * In development: origin: '*' allows requests from anywhere (convenient for testing)
 * In production: You should restrict this to your Vercel frontend URL:
 *   origin: ['https://your-vercel-app.vercel.app']
 * 
 * Example for Render + Vercel deployment:
 *   cors({ origin: process.env.FRONTEND_URL || '*' })
 */
app.use(cors({ origin: '*' }));

/**
 * JSON Parser Middleware
 * Automatically parses incoming JSON request bodies
 */
app.use(express.json());

/**
 * Health Check Endpoint
 * Returns server status and current timestamp
 * Useful for monitoring and load balancers
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * API Routes
 * All product management endpoints
 * Base path: /api/products
 */
app.use('/api/products', productRoutes);

/**
 * Recipe Routes
 * Spoonacular API integration for recipe search
 * Base path: /api/recipes
 */
app.use('/api/recipes', recipeRoutes);

/**
 * Global Error Handling Middleware
 * Catches all errors from routes and logs them
 * Returns consistent error response to client
 */
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', {
    message: err.message,
    status: err.status || 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

module.exports = app;

