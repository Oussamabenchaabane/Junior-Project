const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  
}, {
  timestamps: false,
});

// Add the getAllProducts method
Product.getAllProducts = async function() {
  return await Product.findAll();
};

// Add the createProduct method
Product.createProduct = async function(productData) {
  return await Product.create(productData);
};

// Add the updateProduct method
Product.updateProduct = async function(id, productData) {
  const product = await Product.findByPk(id);
  if (product) {
    return await product.update(productData);
  }
  throw new Error('Product not found');
};

// Add the deleteProduct method
Product.deleteProduct = async function(id) {
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    return true;
  }
  throw new Error('Product not found');
};

module.exports = Product; 