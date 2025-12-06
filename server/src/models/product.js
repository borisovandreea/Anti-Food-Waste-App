const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    unit: { type: DataTypes.STRING, allowNull: true },
    bestBefore: { type: DataTypes.DATEONLY, allowNull: true },
    shareable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    claimedBy: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'products'
  });

  return Product;
};
