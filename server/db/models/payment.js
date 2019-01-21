const Sequelize = require('sequelize');
const db = require('../database');

const Payment = db.define('payment', {
  payment_date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  payment_amt: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Payment;
