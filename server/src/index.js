/**
 * Anti-Food Waste App - Backend Server Entry Point
 * Initializes the Express server, connects to the database, and starts listening for requests
 * Production-ready configuration for deployment on Render.com
 */

require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

// Use dynamic port from environment variable (Render assigns its own)
// Falls back to 4000 for local development
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Starts the server asynchronously
 * 1. Syncs database (creates tables if they don't exist)
 * 2. Starts listening on the configured port
 * 3. Logs server status to console for debugging
 */
async function start() {
  try {
    // Sync Sequelize models with database (creates tables on first run)
    await sequelize.sync({ alter: NODE_ENV === 'development' });
    console.log('✅ Database synchronized successfully');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════╗
║   🌱 Anti-Food Waste Server Started       ║
║   Environment: ${NODE_ENV}${NODE_ENV === 'development' ? '        ' : '      '}
║   Port: ${PORT}                         ║
║   URL: http://localhost:${PORT}          ║
╚═══════════════════════════════════════════╝
      `);
    });
  } catch (startError) {
    console.error('❌ Failed to start server:', startError.message);
    console.error('Full error:', startError);
    process.exit(1);
  }
}

// Start the server
start();

