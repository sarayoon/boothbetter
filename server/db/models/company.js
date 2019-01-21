const Sequelize = require('sequelize');
const db = require('../database');

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false, // built-in postgres validation
    validate: {
      notEmpty: true, //limitation on when it's created in sequelize, blocks it before it enters the database
    },
  },
  address: Sequelize.STRING,
  phone_num: Sequelize.STRING,
});

module.exports = Company;
