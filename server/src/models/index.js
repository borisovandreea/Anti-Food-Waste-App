const { Sequelize } = require('sequelize');
const path = require('path');

const storage = process.env.DATABASE_STORAGE || path.resolve(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false
});

// Import models
const Product = require('./product')(sequelize);

module.exports = {
  sequelize,
  Product
};
