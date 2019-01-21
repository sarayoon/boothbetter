const Sequelize = require('sequelize');
const db = require('../database');

const Market = db.define('market', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Market;
