const Sequelize = require('sequelize');
const db = require('../database');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  price: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  is_space: {
    type: Sequelize.BOOLEAN,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Item;
